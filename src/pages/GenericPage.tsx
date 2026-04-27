import { ArticleLayout } from '../components/ArticleLayout';

export default function GenericPage({ title }: { title: string }) {
  return (
    <ArticleLayout
      title={title}
      description={`Find answers and information regarding our ${title.toLowerCase()}.`}
      readingTime="2"
      date={new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      backUrl="/"
    >
      <h2>Welcome to our {title} page</h2>
      <p>
        Content for {title.toLowerCase()} will be provided here shortly. 
        In the meantime, feel free to use our sleep calculator tool to find your optimal wake-up or bedtimes!
      </p>
    </ArticleLayout>
  );
}
