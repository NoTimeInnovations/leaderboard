import Image from "next/image";
import Topper from './components/Topper.jsx'
import Leaderboard from './components/Leaderboard.jsx'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-5 bg-[#151729] min-h-screen">
      <div className="heading p-2 text-3xl text-white rounded-xl">LeaderBoard</div>
      <div className="parent flex justify-around items-end w-full max-w-4xl mt-10 relative">
        <Topper h={44} position={2} name="Jackson" score="1847" rank="2" />
        <Topper h={56} position={1} name="Eiden" score="2430" rank="1" />
        <Topper h={44} position={3} name="Emma Aria" score="1674" rank="3" />
      </div>
      <Leaderboard />
    </div>
  );
}
