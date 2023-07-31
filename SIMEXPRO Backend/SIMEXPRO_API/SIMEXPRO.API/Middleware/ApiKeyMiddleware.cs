using Microsoft.AspNetCore.Http;
using Microsoft.Azure.KeyVault;
using Microsoft.Azure.KeyVault.Models;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Middleware
{
    public class ApiKeyMiddleware
    {
        private readonly RequestDelegate _next;
        private const string APIKEY = "XApiKey";
        private readonly IConfiguration _configuration;

        public ApiKeyMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            _next = next;
            _configuration = configuration;
        }

        public async Task InvokeAsync(HttpContext context)
        {

            var keyVaultEndpoint = "https://simexpro.vault.azure.net/"; // Replace with your Key Vault URI
            var azureServiceTokenProvider = new AzureServiceTokenProvider();
            var keyVaultClient = new KeyVaultClient(
                new KeyVaultClient.AuthenticationCallback(azureServiceTokenProvider.KeyVaultTokenCallback)
            );

            if (context.Request.Path != "/api/Usuarios/Login")
            {
                if (!context.Request.Headers.TryGetValue(APIKEY, out var extractedApiKey))
                {
                    context.Response.StatusCode = 401;
                    await context.Response.WriteAsync("Api Key was not provided ");
                    return;
                }

                try
                {
                    // Retrieve the API key from Azure Key Vault
                    var secret = await keyVaultClient.GetSecretAsync($"{keyVaultEndpoint}secrets/{APIKEY}");
                    var apiKey = secret.Value;

                    if (!apiKey.Equals(extractedApiKey))
                    {
                        context.Response.StatusCode = 401;
                        await context.Response.WriteAsync("Unauthorized client");
                        return;
                    }
                }
                catch (KeyVaultErrorException)
                {
                    context.Response.StatusCode = 500;
                    await context.Response.WriteAsync("Failed to retrieve API Key from Azure Key Vault");
                    return;
                }

                await _next(context);
            }
            else
            {

                if (context.Response.StatusCode == 200)
                {
                    var secret = await keyVaultClient.GetSecretAsync($"{keyVaultEndpoint}secrets/{APIKEY}");
                    var apiKey = secret.Value;
                    context.Response.Headers.Add("Authorization", "Bearer " + apiKey);
                    await _next(context);
                }
                else
                {
                    await _next(context);
                    context.Response.Headers.Add("Authorization", "Bearer" + "no access");
                }
            }


        }
    }

}