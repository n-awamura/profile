import Image from "next/image";

export function Greeting() {
  return (
    <section className="mt-8 flex justify-center">
      <div className="relative inline-block text-center">
        <div className="relative h-[388px] w-[388px] mobile:h-[min(388px,80vw)] mobile:w-[min(388px,80vw)]">
          <Image
            src="/img/greeting.svg"
            alt="Greeting illustration"
            fill
            priority
            sizes="(max-width: 800px) 80vw, 388px"
            className="object-contain"
          />
        </div>
        <p className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-display text-[1.5rem] font-bold text-site-green whitespace-nowrap">
          Hello, I am Norihisa{" "}
          <span className="text-site-yellow">Awa</span>mura.
        </p>
      </div>
    </section>
  );
}

