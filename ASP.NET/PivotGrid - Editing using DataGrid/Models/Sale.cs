using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PivotGrid___Editing_using_DataGrid.Models
{
    public class Sale
    {
        public int OrderId { get; set; }
        public string Region { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public int Amount { get; set; }
        public DateTime Date { get; set; }
    }
}
