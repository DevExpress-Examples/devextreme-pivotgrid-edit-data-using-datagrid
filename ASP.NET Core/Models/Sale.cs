using System;

namespace ASP_NET_Core.Models;

public class Sale
{
    public int OrderId { get; set; }
    public string Region { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public int Amount { get; set; }
    public DateTime Date { get; set; }
}
