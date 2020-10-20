using System.Security.Cryptography;
using System.Text;

namespace Feria_Virtual.Helpers
{
    public static class Encryption
    {
        public static string Encrypt(string text)
        {
            var md5 = new MD5CryptoServiceProvider();
            md5.ComputeHash(Encoding.ASCII.GetBytes(text));
            var result = md5.Hash;
            var str = new StringBuilder();
            for (int i = 1; i < result.Length; i++)
            {
                str.Append(result[i].ToString("x2"));
            }
            return str.ToString();
        }

        public static bool Equals(string pass, string saved)
        {
            return Encrypt(pass).Equals(saved);
        }
    }
}