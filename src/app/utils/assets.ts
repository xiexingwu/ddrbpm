type AssetType = 
    | "summary"
    | "jacket"
    | "song"

export default function getAssetPath(assetType: AssetType, title: string): URL {
   const baseUrl= "https://cdn.jsdelivr.net/gh/xiexingwu/DDR-BPM-prep@main/build/"
   switch (assetType) {
        case "summary":
            return new URL(`summaries/${title}.json`, baseUrl)
        case "jacket":
            return new URL(`jackets/${title}.png`, baseUrl)
        case "song":
            return new URL(`songs/${title}.json`, baseUrl)
    }
}
