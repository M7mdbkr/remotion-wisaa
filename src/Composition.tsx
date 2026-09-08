import {Audio} from "@remotion/media";
import {
  AbsoluteFill,
  Composition,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";

const C = {
  navy: "#132D3C",
  teal: "#16877B",
  tealLight: "#7FD6C9",
  sand: "#E9D5AD",
  cream: "#FAF7F0",
  coral: "#EF7D66",
  yellow: "#F8D667",
  white: "#FFFFFF",
};

const FONT = '-apple-system, BlinkMacSystemFont, "Noto Sans Arabic", Arial, sans-serif';

const fade = (frame: number, duration: number) =>
  interpolate(frame, [0, 12, duration - 12, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

const BlobBackground: React.FC<{accent?: string}> = ({accent = C.teal}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{overflow: "hidden", backgroundColor: C.cream}}>
      <div
        style={{
          position: "absolute",
          width: 760,
          height: 760,
          borderRadius: "50%",
          backgroundColor: accent,
          opacity: 0.13,
          top: -250,
          right: -290,
          translate: interpolate(frame, [0, 180], ["0px 0px", "-30px 50px"], {
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          backgroundColor: C.sand,
          opacity: 0.4,
          bottom: -290,
          left: -260,
          translate: interpolate(frame, [0, 180], ["0px 0px", "45px -25px"], {
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};

const BrandMark: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 70,
      left: 80,
      right: 80,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      color: C.navy,
      fontFamily: FONT,
      zIndex: 20,
    }}
  >
    <div style={{fontSize: 38, fontWeight: 800}}>WISAA</div>
    <div style={{fontSize: 42, fontWeight: 800, direction: "rtl"}}>وِسعة</div>
  </div>
);

const Headline: React.FC<{title: string; subtitle?: string; color?: string}> = ({
  title,
  subtitle,
  color = C.navy,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        width: 900,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        opacity: interpolate(frame, [0, 18], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(frame, [0, 18], ["0px 50px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      <div
        style={{
          color,
          fontFamily: FONT,
          fontSize: 96,
          lineHeight: 1.15,
          textAlign: "center",
          fontWeight: 900,
          direction: "rtl",
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            color: C.navy,
            fontFamily: FONT,
            fontSize: 46,
            lineHeight: 1.45,
            textAlign: "center",
            fontWeight: 650,
            direction: "rtl",
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};

const Suitcase: React.FC<{closed?: boolean; compact?: boolean}> = ({
  closed = false,
  compact = false,
}) => {
  const frame = useCurrentFrame();
  const squeeze = compact ? 0.74 : 1;
  return (
    <div
      style={{
        position: "relative",
        width: 650,
        height: 520,
        scale: interpolate(frame, [0, 18], [0.82, squeeze], {
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 215,
          width: 220,
          height: 95,
          border: `24px solid ${C.navy}`,
          borderBottom: 0,
          borderRadius: "32px 32px 0 0",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 45,
          width: 560,
          height: 370,
          borderRadius: 58,
          backgroundColor: C.sand,
          border: `18px solid ${C.navy}`,
          boxShadow: "0 34px 0 rgba(19,45,60,0.16)",
          overflow: "hidden",
        }}
      >
        {[C.teal, C.coral, C.yellow, C.tealLight].map((color, i) => (
          <div
            key={color}
            style={{
              position: "absolute",
              left: 72 + i * 18,
              right: 72 - i * 10,
              height: 62,
              top: 46 + i * 68,
              borderRadius: 22,
              backgroundColor: color,
              opacity: closed ? 0.28 : 1,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: C.sand,
            opacity: closed ? 0.88 : 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 30,
            right: 30,
            top: 168,
            height: 10,
            borderRadius: 6,
            backgroundColor: C.navy,
            opacity: closed ? 1 : 0,
          }}
        />
      </div>
      <div style={{position: "absolute", bottom: 0, left: 130, width: 58, height: 58, borderRadius: 30, background: C.navy}} />
      <div style={{position: "absolute", bottom: 0, right: 130, width: 58, height: 58, borderRadius: 30, background: C.navy}} />
    </div>
  );
};

const Character: React.FC<{walking?: boolean; frustrated?: boolean}> = ({
  walking = false,
  frustrated = false,
}) => {
  const frame = useCurrentFrame();
  const bob = Math.sin(frame / 7) * (walking ? 18 : 7);
  return (
    <div style={{position: "relative", width: 360, height: 620, translate: `0px ${bob}px`}}>
      <div style={{position: "absolute", top: 32, left: 102, width: 160, height: 190, borderRadius: "80px 80px 66px 66px", background: C.navy}} />
      <div style={{position: "absolute", top: 64, left: 125, width: 114, height: 124, borderRadius: "50%", background: "#D8A67C"}}>
        <div style={{position: "absolute", top: 48, left: 26, width: 13, height: 13, borderRadius: 8, background: C.navy}} />
        <div style={{position: "absolute", top: 48, right: 26, width: 13, height: 13, borderRadius: 8, background: C.navy}} />
        <div style={{position: "absolute", top: 88, left: 38, width: 40, height: frustrated ? 10 : 18, borderRadius: 12, borderBottom: frustrated ? 0 : `6px solid ${C.coral}`, borderTop: frustrated ? `6px solid ${C.coral}` : 0}} />
      </div>
      <div style={{position: "absolute", top: 200, left: 66, width: 228, height: 280, borderRadius: "92px 92px 36px 36px", background: C.teal}} />
      <div style={{position: "absolute", top: 430, left: 85, width: 64, height: 170, borderRadius: 32, background: C.navy, rotate: walking ? "8deg" : "0deg"}} />
      <div style={{position: "absolute", top: 430, right: 85, width: 64, height: 170, borderRadius: 32, background: C.navy, rotate: walking ? "-8deg" : "0deg"}} />
      <div style={{position: "absolute", top: 235, left: 16, width: 74, height: 230, borderRadius: 40, background: "#D8A67C", rotate: frustrated ? "18deg" : "-5deg"}} />
      <div style={{position: "absolute", top: 235, right: 16, width: 74, height: 230, borderRadius: 40, background: "#D8A67C", rotate: frustrated ? "-18deg" : "5deg"}} />
    </div>
  );
};

const CompressionBag: React.FC<{compress?: boolean; delay?: number}> = ({
  compress = false,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - delay);
  const scaleY = compress
    ? interpolate(local, [25, 95], [1, 0.46], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.2, 0.8, 0.2, 1),
      })
    : 1;
  return (
    <div
      style={{
        position: "relative",
        width: 660,
        height: 420,
        borderRadius: 52,
        border: `14px solid ${C.teal}`,
        background: "rgba(255,255,255,0.64)",
        boxShadow: "0 34px 70px rgba(19,45,60,0.17)",
        scale: `1 ${scaleY}`,
      }}
    >
      {[C.coral, C.yellow, C.tealLight, C.navy].map((color, i) => (
        <div
          key={color}
          style={{
            position: "absolute",
            height: 62,
            left: 70 + i * 8,
            right: 110 - i * 5,
            top: 58 + i * 72,
            borderRadius: 18,
            background: color,
          }}
        />
      ))}
      <div style={{position: "absolute", right: 42, top: 34, width: 90, height: 90, borderRadius: 50, background: C.white, border: `12px solid ${C.navy}`}} />
    </div>
  );
};

const Pump: React.FC<{active?: boolean}> = ({active = false}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        width: 210,
        height: 300,
        borderRadius: "86px 86px 52px 52px",
        background: C.white,
        border: `14px solid ${C.navy}`,
        boxShadow: "0 26px 50px rgba(19,45,60,0.18)",
        scale: active ? interpolate(Math.sin(frame / 4), [-1, 1], [0.97, 1.03]) : 1,
        position: "relative",
      }}
    >
      <div style={{position: "absolute", width: 72, height: 20, borderRadius: 12, background: C.navy, left: 55, bottom: 66}} />
      <div style={{position: "absolute", width: 30, height: 30, borderRadius: 18, background: active ? C.coral : C.teal, right: 30, top: 92}} />
      <div style={{position: "absolute", width: 78, height: 40, borderRadius: "0 0 20px 20px", background: C.navy, left: 52, bottom: -40}} />
    </div>
  );
};

const SceneOne: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = 150;
  return (
    <AbsoluteFill style={{opacity: fade(frame, duration)}}>
      <BlobBackground accent={C.coral} />
      <BrandMark />
      <div style={{position: "absolute", top: 225, left: 90, right: 90, display: "flex", flexDirection: "column", alignItems: "center", gap: 84}}>
        <Headline title="الشنطة ما تقفل؟" subtitle="كل سفرة ونفس الزحمة؟" color={C.coral} />
        <div style={{display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 30, width: "100%"}}>
          <div style={{rotate: interpolate(Math.sin(frame / 5), [-1, 1], ["-2deg", "2deg"])}}><Suitcase /></div>
          <div style={{scale: 0.72}}><Character frustrated /></div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneTwo: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = 180;
  return (
    <AbsoluteFill style={{opacity: fade(frame, duration)}}>
      <BlobBackground />
      <BrandMark />
      <div style={{position: "absolute", top: 245, left: 90, right: 90, display: "flex", flexDirection: "column", alignItems: "center", gap: 115}}>
        <Headline title="رتّب • سكّر • اضغط" subtitle="طقم وِسعة يجيك جاهز للسفر" />
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 60}}>
          <div style={{scale: 0.84, rotate: "-4deg"}}><CompressionBag /></div>
          <div style={{translate: interpolate(frame, [10, 45], ["120px 0px", "0px 0px"], {extrapolateRight: "clamp"}), opacity: interpolate(frame, [10, 36], [0, 1], {extrapolateRight: "clamp"})}}><Pump /></div>
        </div>
        <div style={{display: "flex", gap: 24, direction: "rtl"}}>
          {["15 كيسًا", "مضخة لاسلكية", "USB-C"].map((item) => (
            <div key={item} style={{background: C.navy, color: C.white, borderRadius: 999, padding: "20px 34px", fontFamily: FONT, fontSize: 35, fontWeight: 800}}>{item}</div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneThree: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = 210;
  const progress = interpolate(frame, [30, 120], [0, 100], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return (
    <AbsoluteFill style={{opacity: fade(frame, duration)}}>
      <BlobBackground accent={C.tealLight} />
      <BrandMark />
      <div style={{position: "absolute", top: 225, left: 90, right: 90, display: "flex", flexDirection: "column", alignItems: "center", gap: 100}}>
        <Headline title="يصغر قدامك" subtitle="المضخة تسحب الهواء خلال لحظات" color={C.teal} />
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 36}}>
          <div style={{display: "flex", alignItems: "center", gap: 36}}>
            <CompressionBag compress delay={10} />
            <div style={{scale: 0.72, translate: "-20px -40px"}}><Pump active /></div>
          </div>
          <div style={{width: 760, height: 34, borderRadius: 20, background: "rgba(19,45,60,0.12)", overflow: "hidden"}}>
            <div style={{width: `${progress}%`, height: "100%", borderRadius: 20, background: C.teal}} />
          </div>
        </div>
        <div style={{fontFamily: FONT, direction: "rtl", fontSize: 62, color: C.navy, fontWeight: 900}}>نفس الملابس. مساحة أكثر.</div>
      </div>
    </AbsoluteFill>
  );
};

const SceneFour: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = 180;
  return (
    <AbsoluteFill style={{opacity: fade(frame, duration)}}>
      <BlobBackground accent={C.yellow} />
      <BrandMark />
      <div style={{position: "absolute", top: 235, left: 90, right: 90, display: "flex", flexDirection: "column", alignItems: "center", gap: 85}}>
        <Headline title="ترتيب أريح" subtitle="وأخيرًا... السحاب يقفل بسهولة" />
        <div style={{position: "relative", width: 760, height: 650}}>
          <div style={{position: "absolute", left: 55, top: 40}}><Suitcase closed compact /></div>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{position: "absolute", width: 350, height: 110, borderRadius: 30, background: i === 0 ? C.teal : i === 1 ? C.coral : C.yellow, border: `8px solid ${C.navy}`, left: interpolate(frame, [i * 20, 75 + i * 12], [850, 205], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}), top: 170 + i * 88, scale: 0.72}} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneFive: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = 180;
  return (
    <AbsoluteFill style={{opacity: fade(frame, duration), background: C.navy}}>
      <div style={{position: "absolute", inset: 0, background: `linear-gradient(155deg, ${C.navy} 10%, #1D5961 72%, ${C.teal} 100%)`}} />
      <div style={{position: "absolute", top: 100, left: 90, right: 90, display: "flex", flexDirection: "column", alignItems: "center", gap: 55}}>
        <div style={{fontFamily: FONT, color: C.sand, fontSize: 132, fontWeight: 950, direction: "rtl"}}>وِسعة</div>
        <div style={{fontFamily: FONT, color: C.white, fontSize: 60, fontWeight: 800, direction: "rtl"}}>مساحة أكثر. سفر أريح.</div>
        <div style={{position: "relative", width: 900, height: 780, overflow: "hidden", borderRadius: 80, background: "rgba(255,255,255,0.08)"}}>
          <div style={{position: "absolute", left: interpolate(frame, [0, 130], [-360, 300], {extrapolateRight: "clamp"}), top: 90, scale: 0.78}}><Character walking /></div>
          <div style={{position: "absolute", left: interpolate(frame, [0, 130], [-110, 550], {extrapolateRight: "clamp"}), top: 310, scale: 0.55}}><Suitcase closed compact /></div>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{position: "absolute", left: 120 + i * 210, top: 60, width: 16, height: 560, background: "rgba(255,255,255,0.14)", rotate: "12deg"}} />
          ))}
        </div>
        <div style={{display: "flex", alignItems: "center", gap: 30, direction: "rtl"}}>
          <div style={{background: C.yellow, color: C.navy, borderRadius: 36, padding: "28px 52px", fontFamily: FONT, fontSize: 72, fontWeight: 950}}>179 ر.س</div>
          <div style={{color: C.white, fontFamily: FONT, fontSize: 44, fontWeight: 700, direction: "rtl"}}>15 كيسًا + مضخة USB-C</div>
        </div>
        <div style={{background: C.coral, color: C.white, borderRadius: 999, padding: "28px 92px", fontFamily: FONT, fontSize: 56, fontWeight: 900, direction: "rtl", scale: interpolate(frame, [110, 130, 150], [1, 1.08, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}}>سفرتك جهّز</div>
      </div>
    </AbsoluteFill>
  );
};

export const WisaaCartoon: React.FC = () => (
  <AbsoluteFill>
    <Audio src={staticFile("wisaa-voice-short.m4a")} volume={0.96} />
    <Sequence durationInFrames={150}><SceneOne /></Sequence>
    <Sequence from={150} durationInFrames={180}><SceneTwo /></Sequence>
    <Sequence from={330} durationInFrames={210}><SceneThree /></Sequence>
    <Sequence from={540} durationInFrames={180}><SceneFour /></Sequence>
    <Sequence from={720} durationInFrames={180}><SceneFive /></Sequence>
  </AbsoluteFill>
);

export const MyComposition: React.FC = () => (
  <Composition
    id="WisaaCartoon"
    component={WisaaCartoon}
    durationInFrames={900}
    fps={30}
    width={1080}
    height={1920}
  />
);
