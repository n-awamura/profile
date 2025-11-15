import Image from "next/image";

export function ToTop() {
  return (
    <div className="mt-8 mb-4 text-center">
      <a href="#top" className="to-top-link" aria-label="ページ上部へ戻る">
        <Image src="/img/to-top.svg" alt="To top" width={24} height={24} />
      </a>
    </div>
  );
}

