using System;
using System.IO;
using System.Threading.Tasks;

namespace Feria_Virtual.Helpers
{
    public static class UploadHelper
    {
        public static string UploadsDirectory => "/Uploads";
        public static string Port => "5001";
        public static string Host => "https://localhost";

        public static async Task<string> SaveUpload(string base64Data, string fileIdName)
        {
            try
            {
                var data = Convert.FromBase64String(base64Data[(base64Data.IndexOf(",") + 1)..]);

                var path = $"{JsonHandler.GetDirectory()}{UploadsDirectory}/";

                var fileName = $"{fileIdName}.png";

                await File.WriteAllBytesAsync($"{path}/{fileName}", data)
                    .ConfigureAwait(false);

                return $"{Host}:{Port}/WebUploads/{fileName}";
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine(ex.Message);
            }
            catch (FormatException ex)
            {
                Console.WriteLine(ex.Message);
            }

            return null;
        }
    }
}