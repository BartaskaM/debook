﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;
using tr3am.Data;
using tr3am.DataContracts.Enums;

namespace tr3am.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("tr3am.Data.Entities.Brand", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.ToTable("Brands");
                });

            modelBuilder.Entity("tr3am.Data.Entities.Device", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Active");

                    b.Property<bool>("Available");

                    b.Property<int>("BrandId");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(1024);

                    b.Property<int>("IdentificationNum");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<int>("ModelId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<string>("OS")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<int>("OfficeId");

                    b.Property<DateTime>("Purchased");

                    b.Property<string>("SerialNum")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<float>("TaxRate");

                    b.Property<int?>("UserId");

                    b.Property<string>("Vendor")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("BrandId");

                    b.HasIndex("ModelId");

                    b.HasIndex("OfficeId");

                    b.HasIndex("UserId");

                    b.ToTable("Devices");
                });

            modelBuilder.Entity("tr3am.Data.Entities.Event", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Action");

                    b.Property<DateTime>("CreatedOn");

                    b.Property<int>("DeviceId");

                    b.Property<int>("OfficeId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("DeviceId");

                    b.HasIndex("OfficeId");

                    b.HasIndex("UserId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("tr3am.Data.Entities.Model", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BrandId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("BrandId");

                    b.ToTable("Models");
                });

            modelBuilder.Entity("tr3am.Data.Entities.Office", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<double>("Lat");

                    b.Property<double>("Lng");

                    b.HasKey("Id");

                    b.ToTable("Offices");
                });

            modelBuilder.Entity("tr3am.Data.Entities.Reservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("DeviceId");

                    b.Property<DateTime>("From");

                    b.Property<int>("Status");

                    b.Property<DateTime>("To");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("DeviceId");

                    b.HasIndex("UserId");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("tr3am.Data.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<int>("OfficeId");

                    b.Property<string>("Password")
                        .IsRequired();

                    b.Property<string>("Role");

                    b.Property<string>("Slack");

                    b.HasKey("Id");

                    b.HasIndex("OfficeId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("tr3am.Data.Entities.Device", b =>
                {
                    b.HasOne("tr3am.Data.Entities.Brand", "Brand")
                        .WithMany("Devices")
                        .HasForeignKey("BrandId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("tr3am.Data.Entities.Model", "Model")
                        .WithMany("Devices")
                        .HasForeignKey("ModelId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("tr3am.Data.Entities.Office", "Office")
                        .WithMany("Devices")
                        .HasForeignKey("OfficeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("tr3am.Data.Entities.User", "User")
                        .WithMany("Devices")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("tr3am.Data.Entities.Event", b =>
                {
                    b.HasOne("tr3am.Data.Entities.Device", "Device")
                        .WithMany("Events")
                        .HasForeignKey("DeviceId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("tr3am.Data.Entities.Office", "Office")
                        .WithMany("Events")
                        .HasForeignKey("OfficeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("tr3am.Data.Entities.User", "User")
                        .WithMany("Events")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("tr3am.Data.Entities.Model", b =>
                {
                    b.HasOne("tr3am.Data.Entities.Brand", "Brand")
                        .WithMany("Models")
                        .HasForeignKey("BrandId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("tr3am.Data.Entities.Reservation", b =>
                {
                    b.HasOne("tr3am.Data.Entities.Device", "Device")
                        .WithMany("Reservations")
                        .HasForeignKey("DeviceId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("tr3am.Data.Entities.User", "User")
                        .WithMany("Reservations")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("tr3am.Data.Entities.User", b =>
                {
                    b.HasOne("tr3am.Data.Entities.Office", "Office")
                        .WithMany("Users")
                        .HasForeignKey("OfficeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
