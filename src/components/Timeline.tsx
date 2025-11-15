import { timelineItems, timelineOther } from "@/data/timeline";

export function Timeline() {
  return (
    <div className="mx-auto max-w-[280px] text-left">
      <ol className="relative space-y-8">
        {timelineItems.map((item, index) => {
          const isLast = index === timelineItems.length - 1;
          return (
            <li key={item.company} className="relative pl-10">
              <span
                className={`absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-site-green ${item.isCurrent ? "bg-site-green" : "bg-site-white"}`}
              />
              {!isLast && (
                <span className="absolute left-[5px] top-4 h-[calc(100%+1rem)] w-px bg-site-green" />
              )}
              <p className="text-2xs text-site-navy">{item.period}</p>
              <p className="text-sm text-site-navy">
                <a
                  href={item.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-site-green"
                >
                  {item.company}
                </a>
              </p>
            </li>
          );
        })}
      </ol>

      <div className="mt-16 space-y-2">
        <p className="text-sm font-semibold text-site-navy">{timelineOther.title}</p>
        <p className="text-sm text-site-navy/90">{timelineOther.description}</p>
      </div>
    </div>
  );
}

