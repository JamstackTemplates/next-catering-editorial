import { EmptyPlaceSettingArt } from '../components/artwork';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="wrap py-16 text-center sm:py-24">
      <div className="mx-auto max-w-xl">
        <p className="kicker">Error 404 · Page Missing</p>
        <h1 className="mt-2 font-editorial text-4xl italic text-ink sm:text-6xl">
          Missing from the table
        </h1>
        <p className="mt-4 text-muted">
          The page you asked for is not in this issue. Browse the menus or return to the cover.
        </p>

        <div className="mx-auto my-8 flex justify-center">
          <EmptyPlaceSettingArt />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <SiteLink href="/menus/" className="button">
            Compare the menus
          </SiteLink>
          <SiteLink href="/" className="button button-quiet">
            Return to cover
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
