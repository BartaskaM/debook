using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return File ("/dist/index.html", "text/html");
        }
    }
}
