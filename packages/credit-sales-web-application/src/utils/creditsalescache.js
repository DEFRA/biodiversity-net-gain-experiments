import redis from "redis";

class CreditSalesCache{
	cacheHostName = undefined;
	cachePassword = undefined;
	redisClient = undefined;
	constructor(cacheHostName, cachePassword) {
		this.cacheHostName = cacheHostName;
		this.cachePassword = cachePassword;
		this.redisClient = redis.createClient({
			// rediss for TLS
			url: "rediss://creditsalescache.redis.cache.windows.net:6380",
			password: 'hxY4BxdUL8Wv06M3vOUvX52tWPnqGQjs3AzCaIQR2oE=',
		});
	}
	init = async () => {
		await this.redisClient.on('error', (err) => console.log('Unable to process redis cache request', err));
		await this.redisClient.connect();
	}
	set = async (key, value) => {
		await this.redisClient.set(key, JSON.stringify(value));
	}
	get = async (key) => {
		return await this.redisClient.get(key);
	}
}
export default CreditSalesCache;

// let creditSalesCache = new CreditSalesCache();
// await creditSalesCache.init();
// await creditSalesCache.set('mykey', 'my key object');
// let mykeyCache = await creditSalesCache.get('mykey');
//  console.log('Value = ' + mykeyCache)
