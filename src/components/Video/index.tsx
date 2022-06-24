import { gql, useQuery } from "@apollo/client";
import { DefaultUi, Player, Youtube } from "@vime/react";
import { CaretRight, DiscordLogo, FileArrowDown, Lightning } from "phosphor-react";

import { Button } from "../Button";

import '@vime/core/themes/default.css'

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug($slug: String) {
    lesson(where: {slug: $slug}) {
      title
      videoId
      description
      teacher {
        bio
        avatarURL
        name
      }
    }
  }

`

type VideoProps = {
  lessonSlug: string
}

type TeacherProps = {
  bio: string
  avatarURL: string
  name: string
}

type GetLessonProps = {
  title: string
  videoId: string
  description: string
  teacher: TeacherProps 
}

type GetLessonBySlugResponse = {
  lesson: GetLessonProps
}

export function Video({ lessonSlug }: VideoProps) {
  const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: {
      slug: lessonSlug
    },
    fetchPolicy: 'no-cache'
  })

  if (!data) {
    return (
      <div className="flex-1">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[68vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
            {data.lesson.title}
            </h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
            {data.lesson.description}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <img
                className="h-16 w-16 rounded-full border-2 border-blue-500" 
                src={data.lesson.teacher.avatarURL} 
                alt="" 
              />

              <div className="leading-relaxed">
                <strong className="font-bold text-2xl block">{data.lesson.teacher.name}</strong>
                <span className="text-gray-200 text-sm block">{data.lesson.teacher.bio}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button color>
              <DiscordLogo size={24} />
              Comunidade do discord
            </Button>

            <Button>
              <Lightning size={24} />
              Acesse o desafio
            </Button>
          </div>

        </div>

        <div className="gap-8 mt-20 grid grid-cols-2">
          <a href="#" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">
                Material complementar
              </strong>
              <p className="text-sm text-gray-200 mt-2">
                Mussum Ipsum, cacilds vidis litro abertis. Vehicula non. 
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>

          <a href="#" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">
                Wallpaper exclusivos
              </strong>
              <p className="text-sm text-gray-200 mt-2">
                Nam vulputate dapibus.Leite de capivaris, leite de mula manquis sem cabeça.
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}