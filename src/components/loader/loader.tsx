import { LoadingScreen } from "@/components/ui/loading-screen"
import React from 'react'

const Loader = ({message}: {message: string}) => {
  return (
    <LoadingScreen message={message} />
  )
}

export default Loader;


