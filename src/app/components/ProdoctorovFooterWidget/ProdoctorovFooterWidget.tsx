"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";

// burdukovskaya-natalya-viktorovna
// savinov-arkadij-aleksandrovich
// siprashvili-darya-andreevna

export default function ProdoctorovFooterWidget() {
  const params = useParams();
  const slugParam = params?.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  const doctorSlug = (() => {
    switch (slug) {
      case "burdukovskaya-natalya-viktorovna":
        return "1";
      case "savinov-arkadij-aleksandrovich":
        return "2";
      case "siprashvili-darya-andreevna":
        return "3";
      default:
        return null;
    }
  })();

  useEffect(() => {
    if (!doctorSlug) {
      return;
    }

    const scriptId = "pd_widget_footer_script";
    document.getElementById(scriptId)?.remove();

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://prodoctorov.ru/static/js/widget_footer.js?v06";
    script.async = true;
    script.dataset.doctorSlug = doctorSlug;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [doctorSlug]);

  if (!doctorSlug) {
    return null;
  }

  return (
    <>
      {doctorSlug === "1" && (
        <div>
          <div
            id="pd_widget_footerd166638"
            data-filters="lpu=112840"
            className="pd_widget_footer "
            data-doctor="166638"
          >
            <div className="pd_left">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="pd_doctor_name"
                href="https://prodoctorov.ru/vladivostok/vrach/166638-burdukovskaya/"
              >
                Бурдуковская Наталья Викторовна
              </a>
            </div>
            <div className="pd_middle">
              <div id="pd_widget_footer_content_middled166638"></div>
            </div>
            <div className="pd_right">
              <div id="pd_widget_footer_content_rightd166638"></div>
            </div>
          </div>
          <div className="pd_powered_by">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://prodoctorov.ru/"
            >
              <img
                className="pd_logo"
                width="132"
                src="https://prodoctorov.ru/static/_v1/pd/logos/logo-pd-widget.png"
                alt="ProDoctor"
              />
            </a>
          </div>
        </div>
      )}

      {doctorSlug === "2" && (
        <>
          <div
            id="pd_widget_footerd1351198"
            data-filters="lpu=112840"
            className="pd_widget_footer "
            data-doctor="1351198"
          >
            <div className="pd_left">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="pd_doctor_name"
                href="https://prodoctorov.ru/vladivostok/vrach/1351198-savinov/"
              >
                Савинов Аркадий Александрович
              </a>
            </div>
            <div className="pd_middle">
              <div id="pd_widget_footer_content_middled1351198"></div>
            </div>
            <div className="pd_right">
              <div id="pd_widget_footer_content_rightd1351198"></div>
            </div>
          </div>
          <div className="pd_powered_by">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://prodoctorov.ru/"
            >
              <img
                className="pd_logo"
                width="132"
                src="https://prodoctorov.ru/static/_v1/pd/logos/logo-pd-widget.png"
                alt="ProDoctor"
              />
            </a>
          </div>
        </>
      )}

      {doctorSlug === "3" && (
        <>
          <div
            id="pd_widget_footerd1095027"
            data-filters="lpu=112840"
            className="pd_widget_footer "
            data-doctor="1095027"
          >
            <div className="pd_left">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="pd_doctor_name"
                href="https://prodoctorov.ru/vladivostok/vrach/1095027-siprashvili/"
              >
                Сипрашвили Дарья Андреевна
              </a>
            </div>
            <div className="pd_middle">
              <div id="pd_widget_footer_content_middled1095027"></div>
            </div>
            <div className="pd_right">
              <div id="pd_widget_footer_content_rightd1095027"></div>
            </div>
          </div>
          <div className="pd_powered_by">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://prodoctorov.ru/"
            >
              <img
                className="pd_logo"
                width="132"
                src="https://prodoctorov.ru/static/_v1/pd/logos/logo-pd-widget.png"
                alt="ProDoctor"
              />
            </a>
          </div>
        </>
      )}
    </>
  );
}
