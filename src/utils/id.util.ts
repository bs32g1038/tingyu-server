// // package com.itranswarp.util;

// // import java.net.InetAddress;
// // import java.net.UnknownHostException;
// // import java.time.LocalDate;
// // import java.time.ZoneId;
// // import java.util.regex.Matcher;
// // import java.util.regex.Pattern;

// // import org.slf4j.Logger;
// // import org.slf4j.LoggerFactory;

// // /**
// //  * 53 bits unique id:
// //  *
// //  * |--------|--------|--------|--------|--------|--------|--------|--------|
// //  * |00000000|00011111|11111111|11111111|11111111|11111111|11111111|11111111|
// //  * |--------|---xxxxx|xxxxxxxx|xxxxxxxx|xxxxxxxx|xxx-----|--------|--------|
// //  * |--------|--------|--------|--------|--------|---xxxxx|xxxxxxxx|xxx-----|
// //  * |--------|--------|--------|--------|--------|--------|--------|---xxxxx|
// //  *
// //  * Maximum ID = 11111_11111111_11111111_11111111_11111111_11111111_11111111
// //  *
// //  * Maximum TS = 11111_11111111_11111111_11111111_111
// //  *
// //  * Maximum NT = ----- -------- -------- -------- ---11111_11111111_111 = 65535
// //  *
// //  * Maximum SH = ----- -------- -------- -------- -------- -------- ---11111 = 31
// //  *
// //  * It can generate 64k unique id per IP and up to 2106-02-07T06:28:15Z.
// //  */
// // public final class IdUtil {

// // 	private static final Logger logger = LoggerFactory.getLogger(IdUtil.class);

// // 	private static final Pattern PATTERN_LONG_ID = Pattern.compile("^([0-9]{15})([0-9a-f]{32})([0-9a-f]{3})$");

// // 	private static final Pattern PATTERN_HOSTNAME = Pattern.compile("^.*\\D+([0-9]+)$");

// // 	private static final long OFFSET = LocalDate.of(2000, 1, 1).atStartOfDay(ZoneId.of("Z")).toEpochSecond();

// // 	private static final long MAX_NEXT = 0b11111_11111111_111L;

// // 	private static final long SHARD_ID = getServerIdAsLong();

// // 	private static long offset = 0;

// // 	private static long lastEpoch = 0;

// // 	public static long nextId() {
// // 		return nextId(System.currentTimeMillis() / 1000);
// // 	}

// // 	private static synchronized long nextId(long epochSecond) {
// // 		if (epochSecond < lastEpoch) {
// // 			// warning: clock is turn back:
// // 			logger.warn("clock is back: " + epochSecond + " from previous:" + lastEpoch);
// // 			epochSecond = lastEpoch;
// // 		}
// // 		if (lastEpoch != epochSecond) {
// // 			lastEpoch = epochSecond;
// // 			reset();
// // 		}
// // 		offset++;
// // 		long next = offset & MAX_NEXT;
// // 		if (next == 0) {
// // 			logger.warn("maximum id reached in 1 second in epoch: " + epochSecond);
// // 			return nextId(epochSecond + 1);
// // 		}
// // 		return generateId(epochSecond, next, SHARD_ID);
// // 	}

// // 	private static void reset() {
// // 		offset = 0;
// // 	}

// // 	private static long generateId(long epochSecond, long next, long shardId) {
// // 		return ((epochSecond - OFFSET) << 21) | (next << 5) | shardId;
// // 	}

// // 	private static long getServerIdAsLong() {
// // 		try {
// // 			String hostname = InetAddress.getLocalHost().getHostName();
// // 			Matcher matcher = PATTERN_HOSTNAME.matcher(hostname);
// // 			if (matcher.matches()) {
// // 				long n = Long.parseLong(matcher.group(1));
// // 				if (n >= 0 && n < 8) {
// // 					logger.info("detect server id from host name {}: {}.", hostname, n);
// // 					return n;
// // 				}
// // 			}
// // 		} catch (UnknownHostException e) {
// // 			logger.warn("unable to get host name. set server id = 0.");
// // 		}
// // 		return 0;
// // 	}

// // }
// import os from 'os';
// let lastEpoch = 0;
// let offset = 0;
// const MAX_NEXT = 10;
// const OFFSET = 10;

// // 	private static final long MAX_NEXT = 0b11111_11111111_111L;

// const SHARD_ID = getServerIdAsLong();


// const nextId = (epochSecond: number) => {
//     if (epochSecond < lastEpoch) {
//         console.log('clock is back: ' + epochSecond + ' from previous:' + lastEpoch);
//         epochSecond = lastEpoch;
//     }
//     if (lastEpoch != epochSecond) {
//         lastEpoch = epochSecond;
//         reset();
//     }
//     offset++;
//     const next = offset & MAX_NEXT;
//     if (next == 0) {
//         console.log('maximum id reached in 1 second in epoch: ' + epochSecond);
//         return nextId(epochSecond + 1);
//     }
//     return generateId(epochSecond, next, SHARD_ID);
// };

// const reset = () => {
//     offset = 0;
// };

// const generateId = (epochSecond: number, next, shardId) => {
//     return ((epochSecond - OFFSET) << 21) | (next << 5) | shardId;
// };

// const getServerIdAsLong =() => {
// 		try {
// 			const hostname = os.hostname();
// 			hostname.
// 			Matcher matcher = PATTERN_HOSTNAME.matcher(hostname);
// 			if (matcher.matches()) {
// 				long n = Long.parseLong(matcher.group(1));
// 				if (n >= 0 && n < 8) {
// 					console.log("detect server id from host name {}: {}.", hostname, n);
// 					return n;
// 				}
// 			}
// 		} catch  {
// 		console.log("unable to get host name. set server id = 0.");
// 		}
// 		return 0;
// 	}

// const Generator = (id, seed) => {
//     const getNow = () => Math.floor((Date.now() - seed) / 1000);
//     let counter = 0;
//     let nextTime = 0;
//     const next = () => {
//         counter = 0;
//         nextTime = getNow() + 1;
//     };
//     const uuid = () => {
//         const now = getNow();
//         if (now < nextTime) {
//             if (counter > 4095) {
//                 throw Error('uuid out of range');
//             }
//         } else {
//             next();
//         }

//         const time = (nextTime & 0x1ffffffff) * 2097152;
//         const uid = (id & 0x1ff) * 4096;
//         const count = counter & 0xfff;
//         const uuid = time + uid + count;

//         counter++;

//         return uuid;
//     };
//     return { id, seed, uuid };
// };

// module.exports = (id, seed = 0) => {
//     if (typeof id !== 'number') {
//         throw Error('id need be number');
//     }
//     if (typeof seed !== 'number') {
//         throw Error('seed need be number');
//     }
//     id = parseInt(id);
//     seed = parseInt(seed);
//     if (id < 0 || id > 511) {
//         throw Error('d must be >=0 or <= 511');
//     }
//     if (seed < 0 || seed > Date.now()) {
//         throw Error('seed must <= now');
//     }
//     const gen = Generator(id, seed);
//     gen.id = id;
//     gen.seed = seed;
//     return gen;
// };
