using System;
using System.Linq;
using System.Text.Json;

namespace ASP_NET_Core.Utils
{
    /// <summary>
    /// Extension methods for JSON deserialization with System.Text.Json
    /// </summary>
    public static class JsonExtensions
    {
        /// <summary>
        /// Populates an existing object with values from JSON string.
        /// Only updates properties that are present and non-null in the JSON.
        /// </summary>
        public static void PopulateFromJson<T>(this T target, string json) where T : class
        {
            if (target == null || string.IsNullOrEmpty(json))
                return;

            var source = JsonSerializer.Deserialize<T>(json);
            if (source == null)
                return;

            var properties = typeof(T).GetProperties()
                .Where(p => p.CanRead && p.CanWrite);

            foreach (var property in properties)
            {
                var sourceValue = property.GetValue(source);
                
                if (sourceValue != null && !IsDefaultValue(sourceValue, property.PropertyType))
                {
                    property.SetValue(target, sourceValue);
                }
            }
        }

        private static bool IsDefaultValue(object value, Type type)
        {
            if (value == null || String.IsNullOrEmpty(value.ToString()))
                return true;

            if (type.IsValueType)
            {
                var defaultValue = Activator.CreateInstance(type);
                return value.Equals(defaultValue);
            }

            return false;
        }
    }
}