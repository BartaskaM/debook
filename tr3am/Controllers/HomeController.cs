using Microsoft.AspNetCore.Mvc;

namespace tr3am.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return File("/dist/index.html", "text/html");
        }
    }
}
