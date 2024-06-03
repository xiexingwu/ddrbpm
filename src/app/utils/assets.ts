type AssetType = 
    | "summary"
    | "jacket"
    | "song"

export default function getAssetPath(assetType: AssetType, title: string): string {
   // const baseUrl= "https://cdn.jsdelivr.net/gh/xiexingwu/DDR-BPM-prep@main/build/"
   const baseUrl= "https://raw.githubusercontent.com/xiexingwu/DDR-BPM-prep/main/build/"
   switch (assetType) {
        case "summary":
            return new URL(`summaries/${title}.json`, baseUrl).toString()
        case "jacket":
            return new URL(`jackets-160/${title}.png`, baseUrl).toString()
        case "song":
            return new URL(`songs/${title}.json`, baseUrl).toString()
    }
}
