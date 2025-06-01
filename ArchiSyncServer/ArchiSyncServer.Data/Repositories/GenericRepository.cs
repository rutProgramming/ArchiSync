using ArchiSyncServer.Core.Entities;
using ArchiSyncServer.Core.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;


namespace ArchiSyncServer.Data.Repositories
{


    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly ApplicationDbContext _context;
        protected readonly DbSet<T> _dbSet;

        public GenericRepository(ApplicationDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<T> CreateAsync(T entity)
        {
           
            _dbSet.Add(entity);
            return entity;
        }

        
        public async Task UpdateAsync(int id, T entity)
        {
            var existingEntity = await _dbSet.FindAsync(id);
            if (existingEntity == null)
                throw new KeyNotFoundException($"Entity with ID {id} not found.");

            var keyProperty = _context.Model.FindEntityType(typeof(T)).FindPrimaryKey().Properties.First();
            var keyName = keyProperty.Name;

            var property = typeof(T).GetProperty(keyName);
            if (property != null && property.CanWrite)
            {
                property.SetValue(entity, id);
            }

            var entry = _context.Entry(existingEntity);
            var entityType = _context.Model.FindEntityType(typeof(T));

            foreach (var prop in typeof(T).GetProperties())
            {
                if (prop.Name == keyName) continue;

                if (entityType.FindProperty(prop.Name) == null)
                    continue; 

                var value = prop.GetValue(entity);
                entry.Property(prop.Name).CurrentValue = value;
            }

            await _context.SaveChangesAsync();
        }



        public async Task DeleteAsync(int id)
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }


}
