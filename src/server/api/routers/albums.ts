import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface AlbumData {
  currentAlbum: unknown;
}

export const albumRouter = createTRPCRouter({
  getTodayAlbum: publicProcedure.query(async () => {
    const response = await fetch(
      "https://1001albumsgenerator.com/api/v1/groups/1001things",
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = (await response.json()) as AlbumData;
    return data;
  }),
});
