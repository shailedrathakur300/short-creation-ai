"use client";

import axios from "axios";
import { uuid } from "drizzle-orm/pg-core";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import CustomLoading from "./_components/CustomLoading";
import SelectDuration from "./_components/SelectDuration";
import SelectStyle from "./_components/SelectStyle";
import SelectTopic from "./_components/SelectTopic";

interface ScriptItem {
  contentText: string;
  imagePrompt: string;
}

function CreateNew() {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [videoScript, setVideoScript] = useState<ScriptItem[]>([]);

  const ScriptData = `Hello shailendra`;

  const OnHandleInputChange = (fieldName: string, fieldvalue: string) => {
    if (!fieldName || !fieldvalue) return;
    console.log(fieldName, fieldvalue);
    setFormData((prev: any) => ({ ...prev, [fieldName]: fieldvalue }));
  };

  const onCreateClickHandler = () => {
    // GetvideoScript()
    GenerateAudioFile(ScriptData);
  };

  const GetvideoScript = async () => {
    setLoading(true);
    const prompt = `write a script to generate ${formData.duration} video on topic:- ${formData.topic}  along with ai image prompt in ${formData.imageStyle}formate for each scene  give me result in JSON format with imagePrompt and contentText as field, No Plain text `;

    console.log(prompt);

    const result = await axios
      .post("/api/get-video-script", {
        prompt: prompt,
      })
      .then((resp) => {
        console.log(resp.data.result);
        setVideoScript(resp.data.result);
        GenerateAudioFile(resp.data.result);
      });

    console.log(result);
    setLoading(false);
  };

  const GenerateAudioFile = async (videoScriptData: ScriptItem[]) => {
    setLoading(true);
    let script = "";
    const id = uuid();

    // videoScriptData.forEach((item: ScriptItem) => {
    //   script += item.contentText + '\n'
    // })

    console.log(script);

    await axios
      .post("/api/audio/generate-audio", {
        text: videoScriptData,
        id: id,
      })
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.error("Error generating audio:", error);
      });
    setLoading(false);
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center m-5 ">
        CreateNew
      </h2>
      <div className="mt-10 shadow-md p-10 ">
        <SelectTopic onUserSelect={OnHandleInputChange} />
        <SelectStyle onUserSelect={OnHandleInputChange} />
        <SelectDuration onUserSelect={OnHandleInputChange} />
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
    </div>
  );
}

export default CreateNew;
