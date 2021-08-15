

## 在软件中使用feature-flags.co的SDK


    class Program
    {
        static async Task Main(string[] args)
        {
            // 初始化敏捷开关Workspace的Instace (支持asp.net core中的依赖注入)
            var agileToggle = new AgileToggle("YWFiM2I5YzUtZmY1MS00ZWMyLTkzZjAtNDc0YzY4MWMyYzUz")     // workspace secret作为身份验证（必填）
                                        .AddUserKeyId("hu-beau@feature-flags.co")                     // 设置用户唯一标识（必填）
                                        .AddEmail("hu-beau@feature-flags.co")                         // 设置用户邮箱（可选）
                                        .AddName("hu-beau")                                           // 设置用户名称（可选）
                                        .AddCustomizedProperty("age", "36");                          // 设置自定义的属性（可选）

            // 下面代码通过使用agileToggle.IsInConditionAsync函数，向敏捷开关控制中心发送请求
            // 如果开关"show-welcom"返回了true，则显示"Welcom"，否则显示原版本代码"Hello World!"
            if (await agileToggle.IsInConditionAsync("Mg==__show-welcom"))
            {
                Console.WriteLine("Welcom!");
            }
            else
            {
                Console.WriteLine("Hello World!");
            }
        }
    }


## SDK的原始代码 

    public class AgileToggle
    {
        private static readonly HttpClient _httpClient = new HttpClient();
        private readonly ToggleParam _toggle;
        private readonly string _apiUrl;

        public AgileToggle(string workspaceSecret, string env = "Production", bool isSSL = false)
        {
            _toggle = new ToggleParam();
            _toggle.WorkspaceSecret = workspaceSecret;
            _toggle.FFUserCustomizedProperties = new List<ToggleParam.ToggleParamCustomizedProperty>();

            _apiUrl = "#{protocol}#://api-#{env}#.feature-flags.co/Variation/GetUserVariationResult";
            if (env == "Production")
                _apiUrl.Replace("#{env}#", "prod");
            else
                _apiUrl.Replace("#{env}#", "dev");
            if (isSSL)
                _apiUrl.Replace("#{protocol}#", "https");
            else
                _apiUrl.Replace("#{protocol}#", "http");
        }

        public async Task<bool> IsInConditionAsync(string ffKeyName)
        {
            if (string.IsNullOrWhiteSpace(_toggle.FFUserKeyId))
                throw new Exception("Please use .AddUserKeyId() method to add a User identifier (id of user, user session id or else)");
            using (var content = new StringContent(JsonConvert.SerializeObject(_toggle), System.Text.Encoding.UTF8, "application/json"))
            {
                HttpResponseMessage result = _httpClient.PostAsync(_apiUrl, content).Result;
                if (result.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    string returnValue = await result.Content.ReadAsStringAsync();
                    if (returnValue.ToLower() == "true")
                        return true;
                    else
                        return false;
                }
                throw new Exception($"Failed to post data to feature-flags.co");
            }
        }


        public AgileToggle AddCustomizedProperty(string propertyName, string propertyValue)
        {
            var existed = _toggle.FFUserCustomizedProperties.FirstOrDefault(p => p.Name == propertyName);
            if (existed == null)
                _toggle.FFUserCustomizedProperties.Add(new ToggleParam.ToggleParamCustomizedProperty { Name = propertyName, Value = propertyValue });
            else
                existed.Value = propertyValue;
            return this;
        }

        public AgileToggle AddUserKeyId(string keyId)
        {
            _toggle.FFUserKeyId = keyId;
            return this;
        }

        public AgileToggle AddName(string name)
        {
            _toggle.FFUserName = name;
            return this;
        }

        public AgileToggle AddEmail(string email)
        {
            _toggle.FFUserEmail = email;
            return this;
        }
    }


    public class ToggleParam
    {
        public string FeatureFlagKeyName { get; set; }
        public string WorkspaceSecret { get; set; }
        public string FFUserName { get; set; }
        public string FFUserEmail { get; set; }
        public string FFUserCountry { get; set; }
        public string FFUserKeyId { get; set; }
        public List<ToggleParamCustomizedProperty> FFUserCustomizedProperties { get; set; }


        public class ToggleParamCustomizedProperty
        {
            public string Name { get; set; }
            public string Value { get; set; }
        }
    }


## SDK下载

正在努力将SDK发布到nuget中，敬请耐心等待
