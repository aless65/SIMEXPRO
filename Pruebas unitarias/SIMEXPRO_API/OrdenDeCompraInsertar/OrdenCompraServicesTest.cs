using AutoMapper;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using NSubstitute;
using NUnit.Framework;
using SIMEXPRO.API.Controllers.ControllersProduccion;
using SIMEXPRO.BussinessLogic;
using SIMEXPRO.BussinessLogic.Services.ProduccionServices;
using SIMEXPRO.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace OrdenDeCompraInsertar
{
    public class OrdenCompraServicesTest
    {
        private OrdenCompra ordencompra;
        private OrdenCompraRequest ordenCompraRequest;
        private IMapper mapper;
        [SetUp]
        public void Setup()
        {
            mapper = Substitute.For<IMapper>();
            
            ordencompra = new OrdenCompra()
            {
                Id = 1,
                Name = "Cristian",
                Age = 30
            };
            ordenCompraRequest = new OrdenCompraRequest()
            {
                Name = "Cristian",
                Age = 30
            };

        }

        private IServiceProvider CreateContext(string nameDB)
        {
            var services = new ServiceCollection();

            services.AddDbContext<OrdenCompraContext>(opt => opt.UseInMemoryDatabase(databaseName: nameDB),
                ServiceLifetime.Scoped,
                ServiceLifetime.Scoped);

            return services.BuildServiceProvider();
        }

        [TestCase(HttpStatusCode.OK)]
        [TestCase(HttpStatusCode.InternalServerError)]
        public async Task When_Add_Employee_Services(HttpStatusCode code)
        {
            //Arrange
            var nameDB = Guid.NewGuid().ToString();
            var serviceProvider = CreateContext(nameDB);

            var db = serviceProvider.GetService<OrdenCompraContext>();
            db.Add(ordencompra);

            //Act
            if (code == HttpStatusCode.OK)
                mapper.Map<OrdenCompra>(employeeRequest).ReturnsForAnyArgs(employee);
            else
                mapper.Map<Employee>(ordenCompraRequest).ThrowsForAnyArgs(x => { throw new Exception(); });

            OrdenCompraServices services = new OrdenCompraServices(db, mapper);
            var responseServices = await services.AddEmployee(employeeRequest);

            //Assert
            Assert.AreEqual(code, (responseServices.HttpCode));
        }
    }
}
