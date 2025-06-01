export interface Server {
  slug: string;
  name: string;
  author: string;
  icon: string;
  desc: string;
  starred: boolean;
}

export interface ServerDetail {
  title: string;
  url?: string;
  description: string;
  availableTools: Array<{
    name: string;
    description: string;
    requiredArguments?: Array<{
      name: string;
      type: string;
      details: string;
    }>;
  }>;
  config: any;
}
