import Head from "next/head";
import { BiLogoSpotify } from "react-icons/bi";
import { BiLoader } from "react-icons/bi";

import { api } from "~/utils/api";

interface Album {
  currentAlbum: {
    artist: string;
    artistOrigin: string;
    genres: string[];
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    name: string;
    releaseDate: string;
    subGenres: string[];
    spotifyId: string;
  };
}

export default function Home() {
  const album = api.post.getTodayAlbum.useQuery().data as Album;

  if (!album)
    return (
      <>
        <Head>
          <title>1001 Things</title>
          <meta name="description" content="Things to enjoy before you go!" />
          <link rel="icon" href="/logo1001things.png" />
        </Head>

        <div className="flex h-screen w-screen items-center justify-center bg-[#01161e] font-extrabold text-[#f75590]">
          <BiLoader className="animate-spin text-5xl" />
          Loading today things...
        </div>
      </>
    );

  return (
    <>
      <Head>
        <title>1001 Things</title>
        <meta name="description" content="Things to enjoy before you go!" />
        <link rel="icon" href="/logo1001things.png" />
      </Head>
      <main className="flex h-screen w-screen flex-col items-center justify-center bg-[#01161e] text-[#f2e9dc]">
        <div className="flex h-20 w-full items-center justify-center">
          <h1 className=" text-3xl font-extrabold text-[#f75590]">
            1001 Things
          </h1>
        </div>

        <div>
          <h2 className="text-sm underline">Today Album</h2>
        </div>

        <div className="flex flex-col space-x-3 py-6 md:flex-row">
          <img
            className="h-56 w-56 rounded-lg shadow-xl md:h-80 md:w-80"
            src={album?.currentAlbum?.images[0]?.url}
            alt="album cover"
          />

          <div className="mt-1 flex flex-col justify-evenly space-y-6 md:mt-0">
            <div>
              <h3 className="border-b font-medium">
                {album?.currentAlbum.name}
              </h3>
              <p className="text-sm text-[#f75590]">
                {album?.currentAlbum.artist}
              </p>
            </div>

            <div className="flex flex-col space-y-0">
              <div className="flex flex-row space-x-1 text-sm">
                <b className="font-medium">Release Date:</b>
                <p className="text-[#f75590]">
                  {album?.currentAlbum.releaseDate}
                </p>
              </div>

              <div className="flex flex-row space-x-1 text-sm">
                <b className="font-medium">Origin:</b>
                <p className="text-[#f75590]">
                  {album?.currentAlbum.artistOrigin}
                </p>
              </div>

              <div className="flex flex-row space-x-1 text-sm">
                <b className="font-medium">Genres:</b>
                <p className="text-[#f75590]">
                  {album?.currentAlbum.genres.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <a
            href={`https://open.spotify.com/album/${album?.currentAlbum.spotifyId}`}
            target="_blank"
            rel="noreferrer"
          >
            <BiLogoSpotify className="text-4xl text-green-600 transition-opacity hover:opacity-80" />
          </a>
        </div>

        <div className="fixed bottom-0 flex h-16 w-full items-center justify-center bg-[#750d37] text-center">
          <p className="px-5 text-sm font-bold text-[#f75590]">
            &quot;Music is the best, and cheapest, mind-altering drug in the
            world.&quot;
          </p>
        </div>
      </main>
    </>
  );
}
