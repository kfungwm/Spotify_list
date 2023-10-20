import Image from 'next/image'
import Spotlist from '../components/Spotlist'

export default function Home() {
  return (
    <main className=" p-8 lg:p-24">
      <Spotlist />
    </main>
  )
}
