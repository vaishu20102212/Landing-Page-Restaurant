export default function About() {
  return (
    <div className="container-x py-16 space-y-16 min-[500px]:space-y-20 lg:space-y-24">
      <section className="grid min-[500px]:grid-cols-2 gap-6 min-[500px]:gap-8 lg:gap-10 items-center">
        <div className="relative w-full max-w-64 sm:max-w-80 aspect-square mx-auto">
          <div className="absolute inset-0 rounded-full bg-cream-2 scale-125" />
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <img
              src="../../images/about 1.png"
              alt="Chef plating food in the kitchen"
              className="w-full h-full object-fill"
            />
          </div>
        </div>
        <div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-6xl">
            Our <span className="text-primary">restautant</span>
          </h1>
          <p className="text-muted mt-6 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-muted mt-4 leading-relaxed">
            Duis aute irure dolor in reprehenderit in voluptate velit esse.
          </p>
        </div>
      </section>

      <section className="grid min-[500px]:grid-cols-2 gap-6 min-[500px]:gap-8 lg:gap-10 items-center">
        <p className="text-muted leading-relaxed order-2 min-[500px]:order-1">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
          veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
          voluptatem quia voluptas sit aspernatur aut odit aut fugit.
        </p>
        <div className="relative w-full max-w-64 sm:max-w-80 aspect-square mx-auto order-1 min-[500px]:order-2">
          <div className="absolute inset-0 rounded-full bg-cream-2 scale-125" />
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <img
              src="../../images/about 2.png"
              alt="Table full of dishes"
              className="w-full h-full object-fill"
            />
          </div>
        </div>
      </section>

      <section id="event" className="grid min-[500px]:grid-cols-2 gap-6 min-[500px]:gap-8 lg:gap-10 items-center">
        <div className="rounded-3xl overflow-hidden aspect-[4/5] max-w-64 sm:max-w-none mx-auto w-full">
          <img
            src="../../images/about 3.png"
            alt="Owner and executive chef"
            className="w-full h-full object-fill"
          />
        </div>
        <div id="testimonial">
          <h2 className="font-display font-bold text-xl min-[500px]:text-2xl sm:text-3xl">
            <span className="text-primary">Owner</span> &amp; Executive Chef
          </h2>
          <p className="font-semibold mt-3">Ismail Marzuki</p>
          <blockquote className="text-muted italic mt-6 leading-relaxed text-base sm:text-lg">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua."
          </blockquote>
        </div>
      </section>
    </div>
  )
}
