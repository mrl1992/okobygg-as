import { createClient } from "@sanity/client";

export const useSanity = () => {
  const config = useRuntimeConfig();

  return createClient({
    projectId: config.public.sanityProjectId,
    dataset: config.public.sanityDataset,
    apiVersion: config.public.sanityApiVersion,
    useCdn: true, // use false to always get fresh data while debugging
  });
};
