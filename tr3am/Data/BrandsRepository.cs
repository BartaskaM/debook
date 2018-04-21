using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.Data.Entities;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Brands;

namespace tr3am.Data
{
    public class BrandsRepository : IBrandsRepository
    {
        private readonly List<Brand> _items;

        public BrandsRepository()
        {
            _items = new List<Brand>
            {
                new Brand
                {
                    Id = 1,
                    BrandName = "Huawei",
                    Image = "https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/062013/huawei_0.jpg?itok=mNbiNOQ6",
                    Models = new List<Model>
                    {
                        new Model
                        {
                            Id = 1,
                            Name = "P 10+",
                        },
                    },
                },
                new Brand
                {
                    Id = 2,
                    BrandName = "Apple",
                    Image = "https://assets.econsultancy.com/images/resized/0002/1108/apple_logo-blog-thumb.png",
                    Models = new List<Model>
                    {
                        new Model
                        {
                            Id = 2,
                            Name = "Ipad Air",
                        },
                    },
                },
                new Brand
                {
                    Id = 3,
                    BrandName = "Samsung",
                    Image = "https://vignette.wikia.nocookie.net/logopedia/images/d/dd/Samsung-logo-7.png/revision/latest/scale-to-width-down/640?cb=20160803140631",
                    Models = new List<Model>
                    {
                        new Model
                        {
                            Id = 3,
                            Name = "Galaxy S8+",
                        },
                    },
                },
                new Brand
                {
                    Id = 4,
                    BrandName = "Sony",
                    Image = "http://logok.org/wp-content/uploads/2014/07/Sony_logo-880x660.png",
                    Models = new List<Model>
                    {
                        new Model
                        {
                            Id = 4,
                            Name = "Xperia Z+",
                        },
                    },
                },
            };
        }

        public List<BrandDTO> GetAll()
        {
            return _items.Select(Mapper.Map<Brand, BrandDTO>).ToList();
        }

        public BrandDTO GetById(int id)
        {
            var item = _items.FirstOrDefault(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidBrandException();
            }

            return Mapper.Map<Brand, BrandDTO>(item);
        }

        public int Create(BrandItemRequest request)
        {
            var id = _items.Any() ? _items.Max(x => x.Id) + 1 : 1;

            var item = new Brand
            {
                Id = id,
                BrandName = request.BrandName,
                Image = request.Image,
            };

            if (BrandExists(item))
            {
                throw new DuplicateBrandException();
            }

            _items.Add(item);
            return id;
        }

        public bool BrandExists(Brand brand)
        {
            var result = _items.Find(x =>
            x.BrandName == brand.BrandName &&
            x.Image == brand.Image);

            if (result != null)
            {
                return true;
            }

            return false;
        }

        public void Update(int id, BrandItemRequest request)
        {
            var item = _items.FirstOrDefault(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidBrandException();
            }

            item.BrandName = request.BrandName;
            item.Image = request.Image;
        }

        public void Delete(int id)
        {
            var item = _items.FirstOrDefault(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidBrandException();
            }

            _items.Remove(item);
        }

    }
}
