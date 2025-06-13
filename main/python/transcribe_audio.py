# transcribe_audio.py
import sys
import os
from vosk import Model, KaldiRecognizer
import wave
import json

def transcribe_audio(audio_file_path):
    # Load Vosk model (make sure to download the model and point to it)
    model = Model("path/to/vosk-model")
    wf = wave.open(audio_file_path, "rb")
    recognizer = KaldiRecognizer(model, wf.getframerate())

    result = ""
    while True:
        data = wf.read(4000)
        if len(data) == 0:
            break
        if recognizer.AcceptWaveform(data):
            result += recognizer.Result()

    return result

if __name__ == "__main__":
    # Get the audio file path from arguments
    audio_file_path = sys.argv[1]
    transcript = transcribe_audio(audio_file_path)
    print(json.dumps({"transcript": transcript}))  # Output JSON
