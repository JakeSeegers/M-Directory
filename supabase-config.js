// Initialize Supabase - FIXED VERSION
async function initializeSupabase() {
    try {
        console.log('🔄 Initializing Supabase...');
        
        // Wait for Supabase library with multiple possible access patterns
        let attempts = 0;
        while (attempts < 50) { // Increased attempts
            // Try different ways Supabase might be available
            if (window.supabase?.createClient) {
                // Modern CDN pattern
                supabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_SERVICE_KEY);
                console.log('✅ Supabase initialized (window.supabase.createClient)');
                return true;
            } else if (typeof createClient !== 'undefined') {
                // Global createClient function
                supabaseClient = createClient(window.SUPABASE_URL, window.SUPABASE_SERVICE_KEY);
                console.log('✅ Supabase initialized (global createClient)');
                return true;
            } else if (window.createClient) {
                // Window-attached createClient
                supabaseClient = window.createClient(window.SUPABASE_URL, window.SUPABASE_SERVICE_KEY);
                console.log('✅ Supabase initialized (window.createClient)');
                return true;
            }
            
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
            
            // Debug logging every 10 attempts
            if (attempts % 10 === 0) {
                console.log(`🔍 Attempt ${attempts}: window.supabase =`, window.supabase);
                console.log(`🔍 Available on window:`, Object.keys(window).filter(k => k.toLowerCase().includes('supabase')));
            }
        }
        
        throw new Error('Supabase library not available after 5 seconds');
    } catch (error) {
        console.error('❌ Supabase initialization failed:', error);
        console.log('🔍 Available globals:', Object.keys(window).filter(k => k.toLowerCase().includes('supabase') || k.toLowerCase().includes('create')));
        return false;
    }
}
