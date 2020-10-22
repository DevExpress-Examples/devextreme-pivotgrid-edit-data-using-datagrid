using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using PivotGrid___Editing_using_DataGrid.Models;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace PivotGrid___Editing_using_DataGrid.Controllers {

    [Route("api/[controller]/[action]")]
    public class SampleDataController : Controller {

        [HttpGet]
        public object Get(DataSourceLoadOptions loadOptions) {
            return DataSourceLoader.Load(SampleData.Sales, loadOptions);
        }

        [HttpPost]
        public ActionResult InsertSale(string values) {
            var newSale = new Sale();
            JsonConvert.PopulateObject(values, newSale);

            SampleData.Sales.Add(newSale);

            return Ok(true);
        }

        [HttpPut]
        public ActionResult UpdateSale(int key, string values) {
            var sale = SampleData.Sales.Find(s => s.OrderId == key);
            JsonConvert.PopulateObject(values, sale);

            return Ok(true);
        }

        [HttpDelete]
        public ActionResult DeleteSale(int key) {
            Sale sale = SampleData.Sales.Find(s => s.OrderId == key);

            SampleData.Sales.Remove(sale);

            return Ok(true);
        }
    }
}