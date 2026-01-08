import React from 'react';

// Mock Data Simulation (Replace with actual API calls in a real application)
const featuredCategories = [
    { name: 'الإلكترونيات', icon: '📱', slug: 'electronics' },
    { name: 'الأزياء الرجالية', icon: '👔', slug: 'men-fashion' },
    { name: 'الأزياء النسائية', icon: '👗', slug: 'women-fashion' },
    { name: 'المنزل والمطبخ', icon: '🏠', slug: 'home-kitchen' },
];

const featuredProducts = [
    { id: 1, name: 'سماعات رأس لاسلكية احترافية', price: 499.00, category: 'إلكترونيات', image: 'https://images.unsplash.com/photo-1546435770-d3e499d695c0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 2, name: 'قميص قطني فاخر (لون أزرق)', price: 120.50, category: 'أزياء رجالية', image: 'https://images.unsplash.com/photo-1621957297298-251662892976?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 3, name: 'فستان سهرة أنيق', price: 350.00, category: 'أزياء نسائية', image: 'https://images.unsplash.com/photo-1591047139829-d91ae6484036?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 4, name: 'آلة صنع القهوة الذكية', price: 780.00, category: 'منزل ومطبخ', image: 'https://images.unsplash.com/photo-1557089719-9820a3000922?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const HomePage = () => {
    return (
        // Set dir="rtl" for proper Arabic layout flow
        <div className="min-h-screen bg-gray-50" dir="rtl">

            {/* 1. Hero Section (Banner) */}
            <section className="relative h-[60vh] md:h-[70vh] bg-gray-900 flex items-center justify-center text-center overflow-hidden">
                {/* Background Image/Overlay */}
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-50" 
                    style={{ 
                        backgroundImage: "url('https://images.unsplash.com/photo-1555529690-e59147571587?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" 
                    }}
                ></div>
                
                <div className="relative z-10 text-white p-4 max-w-4xl">
                    <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 leading-tight">
                        اكتشف أحدث صيحات الموضة والتقنية
                    </h1>
                    <p className="text-xl sm:text-2xl mb-8 font-light text-gray-200">
                        تسوق الآن واستمتع بخصومات تصل إلى 50% على المنتجات المختارة.
                    </p>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-xl">
                        ابدأ التسوق الآن
                    </button>
                </div>
            </section>

            {/* 2. Value Proposition / Features */}
            <section className="py-12 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        
                        {/* Feature 1: Shipping */}
                        <div className="p-4">
                            <span className="text-4xl text-red-600 mb-3 block">🚀</span>
                            <h3 className="text-xl font-semibold mb-2">شحن سريع وموثوق</h3>
                            <p className="text-gray-600">نضمن وصول طلبك في أسرع وقت ممكن إلى باب منزلك.</p>
                        </div>
                        
                        {/* Feature 2: Returns */}
                        <div className="p-4">
                            <span className="text-4xl text-red-600 mb-3 block">🛡️</span>
                            <h3 className="text-xl font-semibold mb-2">ضمان استرجاع 30 يومًا</h3>
                            <p className="text-gray-600">تسوق بثقة، يمكنك إرجاع المنتج إذا لم يكن مناسبًا.</p>
                        </div>
                        
                        {/* Feature 3: Payment */}
                        <div className="p-4">
                            <span className="text-4xl text-red-600 mb-3 block">💳</span>
                            <h3 className="text-xl font-semibold mb-2">دفع آمن ومشفر</h3>
                            <p className="text-gray-600">جميع معاملاتك محمية بأعلى معايير الأمان.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Featured Categories */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">تصفح حسب الفئة</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {featuredCategories.map((category) => (
                            <a 
                                key={category.slug} 
                                href={`/category/${category.slug}`}
                                className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 text-center border border-gray-100"
                            >
                                <div className="text-5xl mb-3">{category.icon}</div>
                                <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Featured Products (New Arrivals) */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">منتجات وصلت حديثاً</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl">
                                <div className="h-56 overflow-hidden">
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="w-full h-full object-cover transition duration-500 hover:scale-105"
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">{product.name}</h3>
                                    <p className="text-sm text-gray-500 mb-3">{product.category}</p>
                                    {/* Price display using Arabic numerals if needed, but standard digits are common */}
                                    <p className="text-2xl font-bold text-red-600 mb-4">{product.price} ر.س</p>
                                    <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300">
                                        أضف للسلة
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* CTA to full shop */}
                    <div className="text-center mt-12">
                        <a href="/shop" className="inline-block bg-gray-200 text-gray-800 font-semibold py-3 px-8 rounded-lg hover:bg-gray-300 transition duration-300">
                            شاهد جميع المنتجات
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;