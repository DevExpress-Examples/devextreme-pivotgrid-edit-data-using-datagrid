using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using ASP_NET_Core.Models;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using ASP_NET_Core.Utils;

namespace ASP_NET_Core.Controllers;

[Route("api/[controller]/[action]")]
public class SampleDataController: Controller {
    [HttpGet]
    public object Get(DataSourceLoadOptions loadOptions) {
        return DataSourceLoader.Load(SampleData.Sales, loadOptions);
    }

    [HttpPost]
    public ActionResult InsertSale(string values) {
        var newSale = JsonSerializer.Deserialize<Sale>(values);
        newSale.OrderId = SampleData.Sales.Max(a => a.OrderId) + 1;
        SampleData.Sales.Add(newSale);

        return Ok(true);
    }

    [HttpPut]
    public ActionResult UpdateSale(int key, string values) {
        var sale = SampleData.Sales.Find(s => s.OrderId == key);
        if(sale != null) {
            sale.PopulateFromJson(values);
        }

        return Ok(true);
    }

    [HttpDelete]
    public ActionResult DeleteSale(int key) {
        Sale? sale = SampleData.Sales.Find(s => s.OrderId == key);

        if(sale != null) {
            SampleData.Sales.Remove(sale);
        }

        return Ok(true);
    }
}
