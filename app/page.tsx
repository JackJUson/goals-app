import { ModeToggle } from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className=' min-h-screen h-[50rem] w-full relative flex flex-col items-center justify-center'>
        <div className=''>
          <div className='relative inline-flex before:absolute before:inset-0'>
            <Link
              className='px-3 py-1 text-sm font-medium inline-flex items-center justify-center border rounded-full text-secondary-foreground hover:text-muted-foreground transition duration-150 ease-in-out w-full group border-slate-100/40'
              href='https://www.google.com'
              target='_blank'
            >
              <span className='relative inline-flex items-center'>
                My Socials{' '}
                <span className='tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1'>
                  -&gt;
                </span>
              </span>
            </Link>
          </div>
        </div>

        {/* <p className='text-4xl md:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8'> */}
        <p className='scroll-m-20 text-foreground text-4xl md:text-7xl relative z-20 bg-clip-text py-8 font-extrabold tracking-tight '>
          The 12 Week Year App
        </p>
        {/* <h1 className='text-6xl font-heading mb-4 text-primary font-[600]'>
          Welcome to Goal Tracker
        </h1> */}
        <p className='text-sm mb-8 text-foreground'>Track your goals and achieve more!</p>
        <div className='flex items-center justify-end gap-5'>
          <ModeToggle />
          <Link href='/dashboard'>
            {/* <button className='btn btn-outline bg-secondary text-primary-foreground btn-wide font-medium'> */}
            <Button variant='outline' className=''>
              Go to Dashboard
            </Button>
            {/* </button> */}
          </Link>
        </div>
        {/* <Button variant='default' size='default'>
          Default Button
        </Button>
        <Button variant='destructive' size='sm'>
          Destructive Small Button
        </Button>
        <Button variant='outline' size='lg'>
          Outline Large Button
        </Button>
        <Button variant='secondary' size='icon'>
          Secondary Icon Button
        </Button>
        <Button variant='ghost'>Ghost Button</Button>
        <Button variant='link'>Link Button</Button> */}
      </div>
    </main>
  );
}
