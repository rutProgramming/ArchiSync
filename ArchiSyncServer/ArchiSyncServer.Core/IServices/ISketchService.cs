﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.IServices
{
    public interface ISketchService
    {
        Task<byte[]> GenerateImageAsync(string imagePath);

    }
}
