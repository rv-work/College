import sys
import json
from youtube_transcript_api import YouTubeTranscriptApi

def get_transcript(video_id):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=['hi', 'en'])
    except Exception as e:
        return str(e)

    full_text = " ".join([item['text'] for item in transcript])
    return full_text

if __name__ == "__main__":
    video_id = sys.argv[1]
    try:
        result = get_transcript(video_id)
        print(json.dumps({"success": True, "transcript": result}))
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))
