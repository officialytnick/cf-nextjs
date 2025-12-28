import React from 'react';
import type { Tool } from '../lib/toolsData';
import { generateFaqSchema } from '../seo/generateFaqSchema';
import Link from 'next/link';

interface Props {
  tool: Tool;
  relatedTools?: Tool[];
}

export default function ToolDetails({ tool, relatedTools = [] }: Props) {
  const faqJson = generateFaqSchema(tool.faq || []);

  return (
    <aside className="mt-8">
      {tool.steps && tool.steps.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">How it works</h2>
          <ol className="list-decimal list-inside space-y-2">
            {tool.steps.map((s, idx) => (
              <li key={idx} className="">
                <div className="font-medium">{s.title}</div>
                <div className="text-gray-600 text-sm">{s.description}</div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {tool.features && tool.features.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Why use this tool?</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tool.features.map((f, idx) => (
              <li key={idx} className="border rounded p-3">
                <div className="font-medium">{f.title}</div>
                <div className="text-gray-600 text-sm">{f.description}</div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tool.faq && tool.faq.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Frequently asked questions</h2>
          <div className="space-y-4">
            {tool.faq.map((q, idx) => (
              <div key={idx}>
                <div className="font-medium">{q.question}</div>
                <div className="text-gray-600 text-sm">{q.answer}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {relatedTools && relatedTools.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-3">You might also like</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {relatedTools.map((t) => (
              <Link key={t.id} href={`/${t.id}`} className="block border rounded p-3 text-sm hover:shadow">
                <div className="font-medium">{t.title}</div>
                <div className="text-gray-600">{t.description}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {faqJson && (
        // eslint-disable-next-line react/no-danger
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJson }} />
      )}
    </aside>
  );
}
