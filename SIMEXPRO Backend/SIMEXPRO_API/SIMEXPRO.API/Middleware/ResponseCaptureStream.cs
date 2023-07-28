using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Middleware
{
    public class ResponseCaptureStream : Stream
    {
        public readonly Stream _innerStream;
        public MemoryStream _captureStream;

        public ResponseCaptureStream(Stream innerStream)
        {
            _innerStream = innerStream;
            _captureStream = new MemoryStream();
        }

        public override bool CanRead => throw new NotImplementedException();

        public override bool CanSeek => throw new NotImplementedException();

        public override bool CanWrite => throw new NotImplementedException();

        public override long Length => throw new NotImplementedException();

        public override long Position { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public override void Flush()
        {
            throw new NotImplementedException();
        }

        public byte[] GetCapturedContent()
        {
            return _captureStream.ToArray();
        }

        public override int Read(byte[] buffer, int offset, int count)
        {
            throw new NotImplementedException();
        }

        public override long Seek(long offset, SeekOrigin origin)
        {
            throw new NotImplementedException();
        }

        public override void SetLength(long value)
        {
            throw new NotImplementedException();
        }

        // Implement the Stream methods by wrapping the inner stream.
        // For the sake of brevity, we'll only implement the necessary methods.

        public override void Write(byte[] buffer, int offset, int count)
        {
            _captureStream.Write(buffer, offset, count);
            _innerStream.Write(buffer, offset, count);
        }

        // Implement other Stream methods as needed.
    }


}
