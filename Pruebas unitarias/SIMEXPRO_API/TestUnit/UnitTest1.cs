using System;
using Xunit;

namespace TestUnit
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            int x = 1;
            if (x == 1) {
                Console.WriteLine("hola");
            } 
        }
    }
}
