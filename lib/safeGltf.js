import { useGLTF } from "@react-three/drei";

const PUBLIC_PATH_REGEX = /^\/(?!public\/).+/;
const GLTF_EXT_REGEX = /\.(glb|gltf)$/i;
const BINARY_EXT_REGEX = /\.(glb|gltf|bin|hdr|ktx2)$/i;
const TEXTURE_EXT_REGEX = /\.(png|jpe?g|webp)$/i;

const shouldThrowInDev = () => process.env.NODE_ENV !== "production";

export function assertPublicAssetUrl(url, { label = "asset", extensions } = {}) {
  if (!shouldThrowInDev()) return url;

  if (typeof url !== "string") {
    throw new Error(`[Asset Guard] ${label} URL must be a string. Received: ${typeof url}`);
  }

  if (!PUBLIC_PATH_REGEX.test(url)) {
    throw new Error(
      `[Asset Guard] ${label} URL must be a public path starting with "/" and must not include "/public". Received: ${url}`
    );
  }

  if (extensions && !extensions.test(url)) {
    throw new Error(
      `[Asset Guard] ${label} URL must match ${extensions}. Received: ${url}`
    );
  }

  return url;
}

export function assertPublicGltfUrl(url) {
  return assertPublicAssetUrl(url, { label: "glTF", extensions: GLTF_EXT_REGEX });
}

export function assertPublicBinaryUrl(url) {
  return assertPublicAssetUrl(url, { label: "binary asset", extensions: BINARY_EXT_REGEX });
}

export function assertPublicTextureUrl(url) {
  return assertPublicAssetUrl(url, { label: "texture", extensions: TEXTURE_EXT_REGEX });
}

export function useSafeGLTF(url) {
  assertPublicGltfUrl(url);
  return useGLTF(url);
}

export function preloadSafeGLTF(url) {
  if (typeof window === "undefined") return;
  assertPublicGltfUrl(url);
  useGLTF.preload(url);
}