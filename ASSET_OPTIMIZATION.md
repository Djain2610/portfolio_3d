# Asset Optimization Guide - CRITICAL FOR PRODUCTION

## Problem
Production deployment is failing because GLB files are **too large** for efficient web delivery.

**File Size Breakdown:**
- `isometric_room_-_221b_baker_street.glb` - **96.39 MB** ❌ (LARGEST - probably not even used)
- `bean_bag.glb` - **69.26 MB** ❌
- `street_lamps.glb` - **42.82 MB** ❌ (used in Level, blocks everything)
- `grass.glb` - **27.39 MB** ❌
- `anim_avatar.glb` - **19.20 MB** ❌ (Player avatar)
- `paving_stone.glb` - **16.94 MB** ❌ (used 10x in loop)
- `rock.glb` - **15.28 MB** ❌
- `bench.glb` - **13.09 MB** ❌
- **TOTAL**: ~350+ MB of uncompressed 3D assets

## Solutions

### 1. **Remove Unused Assets** (IMMEDIATE)
Run this command to find which files are NOT referenced in code:
```bash
grep -r "bean_bag\|grass\|isometric_room\|old_couch\|character" components/ app/ --include="*.jsx" --include="*.js"
```

If not found, DELETE these files:
- `isometric_room_-_221b_baker_street.glb` (96 MB)
- `bean_bag.glb` (69 MB)
- `grass.glb` (27 MB)
- Others not actively used

### 2. **Compress Actively Used Assets** (CRITICAL)
For each file in active use, compress using **gltf-transform**:

```bash
npm install --save-dev @gltf-transform/cli

# Compress with draco compression
gltf-transform compress ./public/models/street_lamps.glb ./public/models/street_lamps.glb
gltf-transform compress ./public/models/paving_stone.glb ./public/models/paving_stone.glb
gltf-transform compress ./public/models/anim_avatar.glb ./public/models/anim_avatar.glb
gltf-transform compress ./public/models/rock.glb ./public/models/rock.glb
gltf-transform compress ./public/models/bench.glb ./public/models/bench.glb

# Batch compress all .glb files:
for file in ./public/models/*.glb; do
  echo "Compressing $file..."
  gltf-transform compress "$file" "$file"
done
```

**Expected size reduction: 50-80%**

### 3. **Optimize Asset Instancing** (MEDIUM PRIORITY)
- `paving_stone.glb` (16.94 MB) is loaded **10 times** in a loop
- Consider creating a single batched mesh instead or using InstancedMesh
- Current code in `app/page.js` lines 130-132:
```javascript
{pathZ.map((z, i) => (
  <Asset key={i} url="/models/paving_stone.glb" size={1} position={[0, 0.02, z]} />
))}
```

**FIX**: Create a single combined model or use instancing

### 4. **Add Service Worker Caching** (MEDIUM PRIORITY)
Implement service worker for offline caching:
- Cache GLB files on first load
- Serve from cache on subsequent visits
- Reduces bandwidth usage dramatically

### 5. **Progressive Loading** (LOW PRIORITY)
- Load critical assets first (house, main environment)
- Lazy-load decorative assets (bushes, rocks)
- Show loading indicator while downloading

## Performance Targets

| File | Current | Target | Method |
|------|---------|--------|--------|
| street_lamps.glb | 42.82 MB | <10 MB | Draco compression |
| paving_stone.glb | 16.94 MB | <4 MB | Draco + Batching |
| anim_avatar.glb | 19.20 MB | <5 MB | Draco compression |
| rock.glb | 15.28 MB | <4 MB | Draco compression |
| bench.glb | 13.09 MB | <3 MB | Draco compression |
| **TOTAL** | **~350 MB** | **~30-50 MB** | **90% reduction** |

## Implementation Steps

### Immediate (Do First)
1. ✅ Identify and delete unused files (saves ~200 MB)
2. ✅ Push clean repo
3. ✅ Test production deployment

### Short Term (This Week)
1. Install gltf-transform
2. Compress all actively used models
3. Test compressed models locally
4. Push and redeploy
5. Monitor production console logs for load times

### Medium Term (This Sprint)
1. Optimize paving_stone instancing
2. Add service worker for caching
3. Implement compression headers in next.config.mjs

## Debugging Commands

Check file sizes:
```bash
du -h ./public/models/*.glb | sort -h
```

Test loading single assets:
```bash
curl -I https://yourdeployment.vercel.app/models/street_lamps.glb
```

Monitor compression:
```bash
gltf-transform analyze ./public/models/street_lamps.glb
```

## References
- [gltf-transform Documentation](https://gltf-transform.donmccurdy.com/)
- [Draco Compression](https://github.com/google/draco)
- [Next.js Asset Compression](https://nextjs.org/docs/advanced-features/compression)

---

**STATUS**: Production deployment blocked until assets are optimized. Estimated fix time: 2-4 hours.
