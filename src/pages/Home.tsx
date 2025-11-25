import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';
import { Empty } from '@/components/Empty';

// 定义酒店数据类型
interface HotelAvailability {
  date: string;
  status: 'available' | 'booked';
}

interface Hotel {
  id: number;
  name: string;
  description: string;
  address: string;
  price: number;
  image: string;
  availability: HotelAvailability[];
  continent: string;
  country: string;
  updatedAt: string;
}

// 模拟酒店数据，添加大洲、国家和更新日期字段
const hotels: Hotel[] = [
  {
    id: 1,
    name: "巴厘岛海滨度假酒店",
    description: "位于美丽的巴厘岛海滨，提供舒适的住宿和绝佳的海景",
    address: "巴厘岛库塔海滩路123号",
    price: 880,
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Tropical%20beach%20hotel%2C%20Bali%2C%20luxury%20resort%2C%20ocean%20view&sign=d0ea8fb4dd8cf643c4f824859eed09cf",
    availability: [
      { date: "2025-12-01", status: "available" },
      { date: "2025-12-02", status: "available" },
      { date: "2025-12-03", status: "booked" },
    ],
    continent: "亚洲",
    country: "印度尼西亚",
    updatedAt: "2025-11-25"
  },
  {
    id: 2,
    name: "东京城市中心酒店",
    description: "位于东京市中心，交通便利，靠近主要商业区和景点",
    address: "东京银座456号",
    price: 1280,
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Modern%20Tokyo%20hotel%2C%20city%20view%2C%20skyline&sign=eaaa09a4e4592f776186afcece7302f2",
    availability: [
      { date: "2025-12-01", status: "available" },
      { date: "2025-12-02", status: "booked" },
      { date: "2025-12-03", status: "available" },
    ],
    continent: "亚洲",
    country: "日本",
    updatedAt: "2025-11-24"
  },
  {
    id: 3,
    name: "巴黎左岸精品酒店",
    description: "位于巴黎左岸，靠近塞纳河和埃菲尔铁塔",
    address: "巴黎圣日耳曼大道789号",
    price: 1580,
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Paris%20boutique%20hotel%2C%20French%20architecture%2C%20Eiffel%20Tower%20view&sign=768c26d2c22baf4f84f073b04e3cc439",
    availability: [
      { date: "2025-12-01", status: "booked" },
      { date: "2025-12-02", status: "booked" },
      { date: "2025-12-03", status: "available" },
    ],
    continent: "欧洲",
    country: "法国",
    updatedAt: "2025-11-23"
  },
  {
    id: 4,
    name: "纽约曼哈顿酒店",
    description: "位于纽约曼哈顿中心，靠近时代广场和百老汇",
    address: "纽约第五大道101号",
    price: 1880,
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=New%20York%20Manhattan%20hotel%2C%20skyline%20view%2C%20modern&sign=b12802fac62ea8bf223e497b0814d231",
    availability: [
      { date: "2025-12-01", status: "available" },
      { date: "2025-12-02", status: "available" },
      { date: "2025-12-03", status: "available" },
    ],
    continent: "北美洲",
    country: "美国",
    updatedAt: "2025-11-22"
  },
  {
    id: 5,
    name: "悉尼港湾酒店",
    description: "位于悉尼港湾，提供悉尼歌剧院和港湾大桥的壮丽景色",
    address: "悉尼环形码头12号",
    price: 1480,
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Sydney%20harbor%20hotel%2C%20Opera%20House%20view%2C%20Australia&sign=1bd8bff3b90b9bc83df5e9fb7d7bed77",
    availability: [
      { date: "2025-12-01", status: "booked" },
      { date: "2025-12-02", status: "available" },
      { date: "2025-12-03", status: "booked" },
    ],
    continent: "大洋洲",
    country: "澳大利亚",
    updatedAt: "2025-11-21"
  },
  {
    id: 6,
    name: "迪拜帆船酒店",
    description: "世界著名的七星级酒店，位于迪拜人工岛上",
    address: "迪拜朱美拉海滩路",
    price: 8880,
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Burj%20Al%20Arab%20hotel%2C%20Dubai%2C%20luxury%20resort%2C%20sail%20shape&sign=8da8fbb9a2478dd4022f601a3a05531f",
    availability: [
      { date: "2025-12-01", status: "available" },
      { date: "2025-12-02", status: "available" },
      { date: "2025-12-03", status: "available" },
    ],
    continent: "亚洲",
    country: "阿联酋",
    updatedAt: "2025-11-25"
  }
];

// 获取所有大洲
const getContinents = (): string[] => {
  const continents = [...new Set(hotels.map(hotel => hotel.continent))];
  return ['全部', ...continents];
};

// 根据大洲获取国家
const getCountriesByContinent = (continent: string): string[] => {
  if (continent === '全部') {
    const countries = [...new Set(hotels.map(hotel => hotel.country))];
    return ['全部', ...countries];
  }
  const countries = [...new Set(hotels.filter(hotel => hotel.continent === continent).map(hotel => hotel.country))];
  return ['全部', ...countries];
};

export default function Home() {
  const [selectedHotel, setSelectedHotel] = useState<number | null>(null);
  const { theme, toggleTheme, isDark } = useTheme();
  const [selectedContinent, setSelectedContinent] = useState('全部');
  const [selectedCountry, setSelectedCountry] = useState('全部');
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // 初始化
  useEffect(() => {
    setCountries(getCountriesByContinent(selectedContinent));
    filterAndSortHotels();
    
    // 设置网站最后更新日期为系统当前日期
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    setLastUpdated(formattedDate);
  }, []);

  // 当选择的大洲改变时，更新国家列表
  useEffect(() => {
    setCountries(getCountriesByContinent(selectedContinent));
    setSelectedCountry('全部'); // 重置国家选择
  }, [selectedContinent]);

  // 当筛选条件改变时，过滤和排序酒店
  useEffect(() => {
    filterAndSortHotels();
  }, [selectedContinent, selectedCountry]);

  // 过滤和排序酒店
  const filterAndSortHotels = () => {
    let result = [...hotels];
    
    // 按大洲过滤
    if (selectedContinent !== '全部') {
      result = result.filter(hotel => hotel.continent === selectedContinent);
    }
    
    // 按国家过滤
    if (selectedCountry !== '全部') {
      result = result.filter(hotel => hotel.country === selectedCountry);
    }
    
    // 按更新日期排序（最新的在前）
    result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    
    setFilteredHotels(result);
  };

  // 切换主题
  const handleThemeToggle = () => {
    toggleTheme();
  };

  // 格式化日期显示
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      {/* 头部 */}
      <header className={`sticky top-0 z-10 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
          >
            酒店信息展示系统
          </motion.h1>
        <div className="flex items-center gap-6">
          {/* 优化后的最后更新日期显示 */}
          <div className={`flex items-center px-4 py-2 rounded-full ${
            isDark ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-100 text-blue-800'
          } font-medium transition-all duration-300 shadow-md`}>
            <i className="fa-solid fa-clock-rotate-left mr-2"></i>
            <span>最后更新: {formatDate(lastUpdated)}</span>
          </div>
          
          <button 
            onClick={handleThemeToggle}
            className={`p-2 rounded-full ${isDark ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'} transition-all duration-300 hover:scale-110`}
            aria-label="切换主题"
          >
            <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
        </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl font-semibold mb-6">酒店列表</h2>
          
          {/* 筛选组件 */}
          <div className={`p-4 rounded-lg mb-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">选择大洲</label>
                <select
                  value={selectedContinent}
                  onChange={(e) => setSelectedContinent(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  {getContinents().map((continent) => (
                    <option key={continent} value={continent}>{continent}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">选择国家</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* 酒店列表 */}
          {filteredHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: hotel.id * 0.1 }}
                  className={`rounded-lg overflow-hidden shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'} hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1`}
                  onClick={() => setSelectedHotel(hotel.id)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-medium ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-md`}>
                      ¥{hotel.price}/晚
                    </div>
                    <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-blue-900/70 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                      {hotel.continent} · {hotel.country}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{hotel.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-800'
                      }`}>
                        更新于 {formatDate(hotel.updatedAt)}
                      </span>
                    </div>
                    <p className={`text-sm mb-3 line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{hotel.description}</p>
                    <p className={`text-sm flex items-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <i className="fa-solid fa-location-dot mr-1"></i> {hotel.address}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <Empty />
          )}

          {/* 酒店详情 */}
          {selectedHotel && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`mt-8 p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              {filteredHotels.filter(hotel => hotel.id === selectedHotel).map(hotel => (
                <div key={hotel.id} className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name}
                      className="w-full h-80 object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold">{hotel.name}</h3>
                        <div className="flex items-center mt-1">
                          <span className={`text-sm px-3 py-1 rounded-full ${
                            isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {hotel.continent} · {hotel.country}
                          </span>
                          <span className={`ml-2 text-sm px-3 py-1 rounded-full ${
                            isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-800'
                          }`}>
                            更新于 {formatDate(hotel.updatedAt)}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedHotel(null)}
                        className={`p-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} transition-all duration-300 hover:scale-110`}
                        aria-label="关闭详情"
                      >
                        <i className="fa-solid fa-times"></i>
                      </button>
                    </div>
                    <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{hotel.description}</p>
                    <p className={`mb-4 flex items-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <i className="fa-solid fa-location-dot mr-2"></i> {hotel.address}
                    </p>
                    <p className="text-xl font-semibold mb-6">¥{hotel.price}/晚</p>
                    
                    <h4 className="text-lg font-semibold mb-3">近期可用情况</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {hotel.availability.map((dateInfo, index) => (
                        <div 
                          key={index}
                          className={`p-3 rounded-lg text-center ${
                            dateInfo.status === 'available' 
                              ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                              : isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
                          } transition-transform duration-300 hover:scale-105`}
                        >
                          <p className="text-sm">{formatDate(dateInfo.date)}</p>
                          <p className="text-xs mt-1 capitalize">{dateInfo.status === 'available' ? '可预订' : '已预订'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </main>

      {/* 底部 */}
      <footer className={`mt-12 py-6 ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 酒店信息展示系统 - 技术小白版</p>
          <p className="text-sm mt-2">通过GitHub Pages实现的简易酒店信息展示网站</p>
        </div>
      </footer>
    </div>
  );
}