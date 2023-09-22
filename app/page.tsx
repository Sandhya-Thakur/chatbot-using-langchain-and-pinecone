import Image from 'next/image'
import {ModeToggle} from '@/components/mode-toggle'
import {MenubarDemo} from '@/components/menu-bar'

export default function Home() {
  return (
    <main >
      
      <div className="absolute bottom-5 right-5 h-10 w-10 ...">
      <ModeToggle/>
      </div>
      <div>
        
      </div>
      
    </main>
  )
}
