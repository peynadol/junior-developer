export type Source = {
  id: string;
  title: string;
  source: string;
  favicon: string;
};

export type Entry = {
  category: string;
  original_content: string;
  processed_content: string;
  sources: {
    cited: Source[];
    non_cited: Source[];
  };
};
