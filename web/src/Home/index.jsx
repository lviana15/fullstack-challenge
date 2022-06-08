import React, { useEffect, useState } from "react";
import axios from 'axios';
import { HeartIcon } from "@heroicons/react/outline"

const MAX_TWEET_CHAR = 250

function TweetForm() {
   const [text, setText] = useState('')

   function changeText(e) {
      setText(e.target.value)
   }

   return(
      <div className="border-b border-silver p-4 space-y-6">
         <div className="flex space-x-5">
            <img src="/src/avatar.png" alt="" className="w-7" />
            <h1 className="font-bold text-xl">Página Inicial</h1>
         </div>

         <form className="pl-12 text-lg flex justify-end flex-col">
            <textarea 
               name="text"
               className="bg-transparent outline-none resize-none disabled:opacity-50" 
               placeholder="O que está acontecendo?"
               onChange={changeText}
            />

            <div className="flex justify-end items-center space-x-3">
               <span>
                  <span>{text.length}</span> / <span className="text-birdBlue">{ MAX_TWEET_CHAR }</span>
               </span>
               <button 
                  className="bg-birdBlue px-4 py-2 rounded-full disabled:opacity-50"
                  disabled={text.length > MAX_TWEET_CHAR}
               >Tweetar</button>
            </div>
         </form>
      </div>
   )
}

function Tweet({ name, username, avatar, children}) {
   return(
      <div className="flex space-x-3 p-4 border-b border-silver">
         <div >
            <img src={ avatar } alt="Avatar" />
         </div>

         <div className="space-y-1">
            <span className="font-bold text-sm">{ name }</span> {' '}
            <span className="text-sm text-silver">@{ username }</span>

            <p>{ children }</p>

            <div className="flex space-x-2 text-silver text-sm items-center">
               <HeartIcon className="w-6 stroke-1 stroke-silver" />
               <span>1.2k</span>
            </div>

         </div>
      </div>
   )
}

export default function Home() {
   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbDQzZnNtYzMwMDAwNGNmc2d1cDJzOTU1IiwiaWF0IjoxNjU0NTY3ODM3LCJleHAiOjE2NTQ2NTQyMzd9.dUnFdd6FJcjpv8jdJ0DXQaD2tOf1KYGItmxq53goSkY"
   const [data, setData] = useState([])

   async function getData() {
      const res = await axios.get('http://localhost:9901/tweets', {
         headers: {
            'authorization': `Bearer ${token}`,
         }
      })
      setData(res.data)
   } 

   useEffect(() => {
      getData()
   }, [])

   return(
      <>
         <TweetForm />
         <div>
            {data.length && data.map(tweet => (
               <Tweet name={tweet.user.name} username={tweet.user.username} avatar='/src/avatar.png'>
                  {tweet.text}
               </Tweet>
            ))}
         </div>
      </>
   )
}
