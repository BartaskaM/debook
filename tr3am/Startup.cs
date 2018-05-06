using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using tr3am.Data;
using tr3am.DataContracts;
using tr3am.Services;

namespace tr3am
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            Mappings.SetupMappings();
            services.AddMvc();
            services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("Tr3amConnection")));

            services.AddSingleton(Configuration.GetSection("SendGridOptions").Get<SendGridOptions>());
            services.AddSingleton<EmailService>();
            services.AddScoped<IOfficesRepository, OfficesRepository>();
            services.AddScoped<IUsersRepository, UsersRepository>();
            services.AddScoped<IAuth, UsersRepository>();
            services.AddScoped<IBrandsRepository, BrandsRepository>();
            services.AddScoped<IDevicesRepository, DevicesRepository>();
            services.AddScoped<IEventsRepository, EventsRepository>();
            services.AddScoped<IReservationsRepository, ReservationsRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
