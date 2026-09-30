import { Activity } from '../types';

export const ACTIVITIES_DATA: Activity[] = [
  // ==========================================
  // LENGUA CASTELLANA
  // ==========================================
  {
    id: 'lengua_sonido_b_d',
    subjectId: 'lengua',
    type: 'phonics_sound',
    title: 'Sonidos Gemelos: La "b" y la "d"',
    instruction: 'Escucha con atención y selecciona la letra que suena como /B/ de Barco.',
    instructionAudio: 'Escucha con atención y selecciona la letra que suena como B de Barco.',
    difficulty: 1,
    skillCategory: 'Discriminación b/d',
    hint: 'La letra "b" tiene la pancita mirando hacia la derecha 👉, como una bota que camina hacia adelante.',
    visualCue: '⛵',
    correctFeedback: '¡Fantástico! La "b" tiene su pancita a la derecha, ¡como un barco navegando!',
    encouragingFeedback: '¡Buen intento! Mira la pista visual: la "b" mira hacia la derecha.',
    options: [
      { id: 'opt_b', text: 'b', isCorrect: true, phonemeHelp: 'b (pancita a la derecha)' },
      { id: 'opt_d', text: 'd', isCorrect: false, phonemeHelp: 'd (espalda a la derecha)' },
      { id: 'opt_p', text: 'p', isCorrect: false, phonemeHelp: 'p (pata hacia abajo)' },
      { id: 'opt_q', text: 'q', isCorrect: false, phonemeHelp: 'q (pata derecha abajo)' }
    ]
  },
  {
    id: 'lengua_construye_sol',
    subjectId: 'lengua',
    type: 'word_builder',
    title: 'Construye la palabra SOL',
    instruction: 'Ordena las letras para formar la palabra SOL ☀️.',
    instructionAudio: 'Toca las letras en orden para formar la palabra SOL.',
    difficulty: 1,
    skillCategory: 'Construcción de palabras',
    hint: 'Empieza con el sonido de la serpiente /Sssss/, luego la /O/ y termina con /Lll/.',
    visualCue: '☀️',
    targetWord: 'SOL',
    scrambledLetters: ['L', 'S', 'O'],
    correctFeedback: '¡Brillante! Has escrito S - O - L, ¡brillas como el sol!',
    encouragingFeedback: '¡Casi lo tienes! Recuerda el primer sonido: /S/.'
  },
  {
    id: 'lengua_silabas_luna',
    subjectId: 'lengua',
    type: 'word_builder',
    title: 'Une las sílabas: LU - NA',
    instruction: 'Une las dos sílabas para formar la palabra de la noche: LUNA 🌙.',
    instructionAudio: 'Toca primero la sílaba LU y luego la sílaba NA.',
    difficulty: 1,
    skillCategory: 'Unir sílabas',
    hint: 'La primera sílaba suena LU y la segunda sílaba suena NA.',
    visualCue: '🌙',
    targetWord: 'LUNA',
    syllables: ['LU', 'NA'],
    correctFeedback: '¡Maravilloso! LU + NA forman LUNA.',
    encouragingFeedback: '¡Muy cerca! Escucha la palabra completa: LU... NA.'
  },
  {
    id: 'lengua_asocia_imagen',
    subjectId: 'lengua',
    type: 'word_match',
    title: 'Palabra e Imagen',
    instruction: 'Lee la palabra y elige la imagen que le corresponde: MARIPOSA.',
    instructionAudio: 'Lee la palabra con calma: MA - RI - PO - SA. ¿Cuál de estas imágenes es?',
    difficulty: 1,
    skillCategory: 'Asociación palabra-imagen',
    targetWord: 'MARIPOSA',
    hint: 'Tiene hermosas alas de colores y vuela de flor en flor.',
    visualCue: '🦋',
    correctFeedback: '¡Exacto! Esa es una hermosa mariposa.',
    encouragingFeedback: '¡Inténtalo otra vez! Recuerda leer sílaba por sílaba: MA - RI - PO - SA.',
    options: [
      { id: 'opt_mariposa', text: '🦋 Mariposa', isCorrect: true },
      { id: 'opt_manzana', text: '🍎 Manzana', isCorrect: false },
      { id: 'opt_mesa', text: '🪑 Mesa', isCorrect: false }
    ]
  },
  {
    id: 'lengua_lectura_guiada_lucas',
    subjectId: 'lengua',
    type: 'guided_reading',
    title: 'Lectura Guiada: Lucas el Perrito',
    instruction: 'Lee con ayuda del audio la historia de Lucas el perrito explorador.',
    instructionAudio: 'Toca el botón de escuchar para oír cada palabra mientras se ilumina.',
    difficulty: 2,
    skillCategory: 'Lectura fluida guiada',
    storyContext: 'Lucas es un perrito blanco y juguetón. Un día soleado, encontró una pelota brillante en el jardín. Con alegría, corrió junto a su amiga la gata Misi.',
    visualCue: '🐶',
    hint: 'Puedes escuchar el audio todas las veces que quieras mientras sigues con tu dedo.',
    correctFeedback: '¡Increíble lectura! Cada día lees con mayor confianza.',
    encouragingFeedback: '¡Buen ritmo! La práctica constante nos hace grandes lectores.'
  },
  {
    id: 'lengua_comprension_lucas',
    subjectId: 'lengua',
    type: 'reading_comprehension',
    title: 'Comprensión: ¿Dónde jugaba Lucas?',
    instruction: 'Recordando la historia: ¿Qué encontró el perrito Lucas en el jardín?',
    instructionAudio: '¿Qué objeto encontró Lucas en el jardín según la historia?',
    difficulty: 1,
    skillCategory: 'Comprensión lectora',
    storyContext: 'Lucas encontró una pelota brillante en el jardín y corrió con su amiga Misi.',
    visualCue: '⚽',
    hint: 'Era un objeto redondo y brillante con el que le gustaba jugar.',
    correctFeedback: '¡Genial memoria! Encontró una pelota brillante.',
    encouragingFeedback: '¡Escucha de nuevo la historia con el botón de audio para descubrirlo!',
    options: [
      { id: 'opt_pelota', text: '⚽ Una pelota brillante', isCorrect: true },
      { id: 'opt_libro', text: '📖 Un libro de cuentos', isCorrect: false },
      { id: 'opt_zapato', text: '👟 Un zapato viejo', isCorrect: false }
    ]
  },
  {
    id: 'lengua_pronuncia_estrella',
    subjectId: 'lengua',
    type: 'voice_pronunciation',
    title: 'Practica tu Pronunciación: ESTRELLA',
    instruction: 'Toca el micrófono y pronuncia en voz alta la palabra: ESTRELLA ⭐.',
    instructionAudio: 'Toca el micrófono y di con voz clara: ESTRELLA.',
    difficulty: 1,
    skillCategory: 'Pronunciación y articulación',
    targetWord: 'estrella',
    visualCue: '⭐',
    hint: 'Divide la palabra despacio: ES - TRE - LLA.',
    correctFeedback: '¡Excelente pronunciación! Tu voz suena clara y segura.',
    encouragingFeedback: '¡Buen intento! Respira hondo y dilo despacio: ES - TRE - LLA.'
  },

  // ==========================================
  // MATEMÁTICAS
  // ==========================================
  {
    id: 'mat_conteo_manzanas',
    subjectId: 'matematicas',
    type: 'visual_count',
    title: 'Conteo en el Árbol Mágico',
    instruction: 'Cuenta cuántas manzanas rojas 🍎 hay en la canasta.',
    instructionAudio: 'Cuenta las manzanas una por una tocando la pantalla.',
    difficulty: 1,
    skillCategory: 'Conteo visual manipulable',
    visualCue: '🍎🍎🍎🍎',
    hint: 'Toca cada manzana: 1, 2, 3, 4...',
    correctFeedback: '¡Conteo perfecto! Hay exactamente 4 deliciosas manzanas.',
    encouragingFeedback: '¡Contemos juntos otra vez! 1, 2, 3... ¿cuántas siguen?',
    options: [
      { id: 'opt_3', text: '3 manzanas', isCorrect: false },
      { id: 'opt_4', text: '4 manzanas 🍎', isCorrect: true },
      { id: 'opt_5', text: '5 manzanas', isCorrect: false }
    ],
    metadata: { count: 4, itemEmoji: '🍎' }
  },
  {
    id: 'mat_suma_mariposas',
    subjectId: 'matematicas',
    type: 'math_operation',
    title: 'Suma con Mariposas',
    instruction: 'Si tienes 3 mariposas azules 🦋 y llegan 2 mariposas más, ¿cuántas hay en total?',
    instructionAudio: '3 mariposas más 2 mariposas. ¿Cuántas son en total?',
    difficulty: 1,
    skillCategory: 'Sumas visuales concretas',
    visualCue: '🦋🦋🦋 + 🦋🦋',
    hint: 'Junta todas las mariposas y cuéntalas de corrido: 1, 2, 3, 4, 5.',
    correctFeedback: '¡Fantástico! 3 + 2 = 5 mariposas.',
    encouragingFeedback: '¡Casi! Prueba sumando con tus dedos: 3 dedos en una mano y 2 en la otra.',
    options: [
      { id: 'opt_4', text: '4', isCorrect: false },
      { id: 'opt_5', text: '5 mariposas 🦋', isCorrect: true },
      { id: 'opt_6', text: '6', isCorrect: false }
    ]
  },
  {
    id: 'mat_balanza_comparacion',
    subjectId: 'matematicas',
    type: 'math_comparison',
    title: 'La Balanza de Números: Mayor o Menor',
    instruction: '¿Cuál número es MAYOR entre el 8 y el 3?',
    instructionAudio: 'Observa la balanza. ¿Cuál de estos dos números es mayor: 8 o 3?',
    difficulty: 1,
    skillCategory: 'Mayor que / menor que',
    visualCue: '⚖️ 8 vs 3',
    hint: 'El número 8 tiene más cantidad y hace bajar la balanza con más peso.',
    correctFeedback: '¡Exacto! El 8 es mayor que el 3 ( 8 > 3 ).',
    encouragingFeedback: '¡Piénsalo con caramelos! ¿Preferirías 8 caramelos o 3?',
    options: [
      { id: 'opt_8', text: 'El número 8 es mayor ⚖️', isCorrect: true },
      { id: 'opt_3', text: 'El número 3 es mayor', isCorrect: false },
      { id: 'opt_igual', text: 'Son iguales', isCorrect: false }
    ]
  },
  {
    id: 'mat_patron_ranita',
    subjectId: 'matematicas',
    type: 'pattern_sequence',
    title: 'La Ranita Saltarina: Serie de 2 en 2',
    instruction: 'La ranita salta de 2 en 2: 2, 4, 6, [ ? ], 10. ¿Qué número sigue?',
    instructionAudio: 'Observa los saltos: 2, 4, 6... ¿Qué número falta en la casilla?',
    difficulty: 2,
    skillCategory: 'Series numéricas y patrones',
    visualCue: '🐸 2 ➔ 4 ➔ 6 ➔ ❓ ➔ 10',
    hint: 'Al número 6 súmale 2 más: 6 + 2 = ...',
    correctFeedback: '¡Gran salto! Sigue el número 8.',
    encouragingFeedback: '¡Muy cerca! Cuenta con los dedos a partir de 6: siete, ocho...',
    options: [
      { id: 'opt_7', text: '7', isCorrect: false },
      { id: 'opt_8', text: '8 🐸', isCorrect: true },
      { id: 'opt_9', text: '9', isCorrect: false }
    ]
  },
  {
    id: 'mat_fraccion_pizza',
    subjectId: 'matematicas',
    type: 'fractions_visual',
    title: 'Fracciones en la Pizza',
    instruction: 'Cortamos una pizza en 4 pedazos iguales y comemos 1. ¿Qué fracción comimos?',
    instructionAudio: 'Una pizza cortada en 4 partes iguales. Si tomamos 1 porción, ¿cuál es la fracción?',
    difficulty: 2,
    skillCategory: 'Fracciones visuales',
    visualCue: '🍕 1 de 4 pedazos',
    hint: 'El número de arriba (1) es lo que tomamos, y el de abajo (4) es el total de pedazos.',
    correctFeedback: '¡Delicioso y correcto! Representa un cuarto: 1/4.',
    encouragingFeedback: '¡Mira el dibujo! Es 1 rebanada de un total de 4 rebanadas.',
    options: [
      { id: 'opt_1_4', text: '1/4 (Un cuarto) 🍕', isCorrect: true },
      { id: 'opt_1_2', text: '1/2 (La mitad)', isCorrect: false },
      { id: 'opt_3_4', text: '3/4 (Tres cuartos)', isCorrect: false }
    ]
  },

  // ==========================================
  // CIENCIAS NATURALES
  // ==========================================
  {
    id: 'ciencias_habitat_acuatico',
    subjectId: 'ciencias_naturales',
    type: 'science_classification',
    title: 'Hábitats: ¿Quién vive en el agua?',
    instruction: 'Encuentra el animal que vive en el agua 🌊.',
    instructionAudio: 'Observa los animales. ¿Cuál de ellos nada y vive bajo el agua?',
    difficulty: 1,
    skillCategory: 'Animales y hábitats',
    visualCue: '🌊 🐬',
    hint: 'Tiene aletas para nadar y salta alegremente sobre las olas del océano.',
    correctFeedback: '¡Maravilloso! El delfín es un animal acuático.',
    encouragingFeedback: '¡Casi! Busca al que tiene aletas y vive nadando.',
    options: [
      { id: 'opt_delfin', text: '🐬 Delfín', isCorrect: true },
      { id: 'opt_leopardo', text: '🐆 Leopardo', isCorrect: false },
      { id: 'opt_aguila', text: '🦅 Águila', isCorrect: false }
    ]
  },
  {
    id: 'ciencias_partes_planta',
    subjectId: 'ciencias_naturales',
    type: 'science_diagram',
    title: 'Las Partes de la Planta',
    instruction: '¿Qué parte de la planta está bajo la tierra y absorbe agua y nutrientes?',
    instructionAudio: '¿Cómo se llama la parte de la planta que crece bajo la tierra y bebe agua?',
    difficulty: 1,
    skillCategory: 'Botánica y plantas',
    visualCue: '🌱 🥕',
    hint: 'Está escondida bajo la tierra y sostiene firmemente a la planta.',
    correctFeedback: '¡Exacto! Es la RAÍZ, el ancla y la boca de la planta.',
    encouragingFeedback: '¡Mira hacia la base de la tierra! Es la raíz.',
    options: [
      { id: 'opt_raiz', text: '🌱 La Raíz', isCorrect: true },
      { id: 'opt_flor', text: '🌸 La Flor', isCorrect: false },
      { id: 'opt_hoja', text: '🍃 Las Hojas', isCorrect: false }
    ]
  },
  {
    id: 'ciencias_cinco_sentidos',
    subjectId: 'ciencias_naturales',
    type: 'science_diagram',
    title: 'Los 5 Sentidos: El Oído',
    instruction: '¿Con cuál de nuestros sentidos podemos escuchar las notas de una canción 🎶?',
    instructionAudio: '¿Qué órgano de nuestro cuerpo nos permite escuchar los sonidos?',
    difficulty: 1,
    skillCategory: 'Cuerpo humano y sentidos',
    visualCue: '👂 🎶',
    hint: 'Lo tenemos a los lados de la cabeza y nos permite oír campanas y voces.',
    correctFeedback: '¡Muy bien! El sentido del oído con nuestras orejas nos permite escuchar.',
    encouragingFeedback: '¡Tócate los lados de la cabeza! Es el oído.',
    options: [
      { id: 'opt_oido', text: '👂 El Oído', isCorrect: true },
      { id: 'opt_vista', text: '👀 La Vista (Ojos)', isCorrect: false },
      { id: 'opt_gusto', text: '👅 El Gusto (Lengua)', isCorrect: false }
    ]
  },
  {
    id: 'ciencias_estados_materia',
    subjectId: 'ciencias_naturales',
    type: 'science_classification',
    title: 'El Ciclo del Agua: ¿Qué pasa con el hielo?',
    instruction: 'Si dejas un cubito de hielo al sol caliente ☀️, ¿en qué se transforma?',
    instructionAudio: 'Cuando el hielo se calienta, ¿en qué estado de la materia se convierte?',
    difficulty: 2,
    skillCategory: 'Estados de la materia',
    visualCue: '🧊 ➔ ☀️ ➔ 💧',
    hint: 'Se derrite y se convierte en agua líquida fresca.',
    correctFeedback: '¡Científico genial! El hielo pasa de estado sólido a estado líquido.',
    encouragingFeedback: '¡Imagina un helado bajo el sol! Se derrite en agua líquida.',
    options: [
      { id: 'opt_liquido', text: '💧 Agua líquida', isCorrect: true },
      { id: 'opt_roca', text: '🪨 Piedra dura', isCorrect: false },
      { id: 'opt_aire', text: '💨 Gas invisible al instante', isCorrect: false }
    ]
  },

  // ==========================================
  // CIENCIAS SOCIALES
  // ==========================================
  {
    id: 'social_profesion_salud',
    subjectId: 'ciencias_sociales',
    type: 'social_community',
    title: 'Nuestra Comunidad: ¿Quién cuida la salud?',
    instruction: '¿Qué profesional cuida de nuestra salud y nos ayuda a curarnos?',
    instructionAudio: '¿Quién atiende a las personas en el hospital cuando están enfermas?',
    difficulty: 1,
    skillCategory: 'Comunidad y profesiones',
    visualCue: '👩‍⚕️ 🩺',
    hint: 'Lleva una bata blanca, un estetoscopio y mucho cariño para curar.',
    correctFeedback: '¡Correcto! La médica o doctor nos acompaña y cuida nuestra salud.',
    encouragingFeedback: '¡Observa el estetoscopio en su cuello! Es la médica.',
    options: [
      { id: 'opt_medica', text: '👩‍⚕️ Médica / Doctor', isCorrect: true },
      { id: 'opt_bombero', text: '👨‍🚒 Bombero', isCorrect: false },
      { id: 'opt_panadero', text: '👨‍🍳 Panadero', isCorrect: false }
    ]
  },
  {
    id: 'social_regiones_colombia',
    subjectId: 'ciencias_sociales',
    type: 'social_colombia',
    title: 'Colombia Linda: Las Regiones Naturales',
    instruction: '¿En qué hermosa región de Colombia se encuentra la cordillera de los Andes con montañas y nevados?',
    instructionAudio: '¿Cómo se llama la región montañosa del centro de Colombia?',
    difficulty: 2,
    skillCategory: 'Geografía y Colombia',
    visualCue: '🏔️ 🇨🇴',
    hint: 'Su nombre viene de la cordillera de los Andes: Región An...',
    correctFeedback: '¡Excelente! La Región Andina es el corazón montañoso de Colombia.',
    encouragingFeedback: '¡Escucha el inicio de la palabra! Andes ➔ Región Andina.',
    options: [
      { id: 'opt_andina', text: '🏔️ Región Andina', isCorrect: true },
      { id: 'opt_amazonia', text: '🌳 Región Amazónica', isCorrect: false },
      { id: 'opt_caribe', text: '🏖️ Región Caribe', isCorrect: false }
    ]
  },
  {
    id: 'social_simbolos_bandera',
    subjectId: 'ciencias_sociales',
    type: 'social_colombia',
    title: 'Bandera de Colombia: El Color del Sol y el Oro',
    instruction: '¿Cuál es el color superior más grande de la bandera de Colombia 🇨🇴?',
    instructionAudio: '¿Qué color representa las riquezas y el sol en la bandera colombiana?',
    difficulty: 1,
    skillCategory: 'Símbolos patrios',
    visualCue: '🇨🇴',
    hint: 'Es un color cálido y brillante como el sol: ¡Amarillo!',
    correctFeedback: '¡Maravilloso! El Amarillo representa la riqueza y la luz.',
    encouragingFeedback: '¡Mira el emoji de la bandera 🇨🇴! La franja de arriba es amarilla.',
    options: [
      { id: 'opt_amarillo', text: '💛 Amarillo', isCorrect: true },
      { id: 'opt_azul', text: '💙 Azul', isCorrect: false },
      { id: 'opt_rojo', text: '❤️ Rojo', isCorrect: false }
    ]
  },
  {
    id: 'social_convivencia_aula',
    subjectId: 'ciencias_sociales',
    type: 'social_community',
    title: 'Convivencia: Respeto en el Colegio',
    instruction: 'Cuando un compañero o profesor está hablando en clase, ¿qué es lo más respetuoso que podemos hacer?',
    instructionAudio: '¿Cómo demostramos respeto y compañerismo en el salón de clase?',
    difficulty: 1,
    skillCategory: 'Valores y convivencia',
    visualCue: '🤝 👂',
    hint: 'Escuchar con atención y levantar la mano si queremos hablar.',
    correctFeedback: '¡Sensacional! Escuchar a los demás crea un aula feliz y amigable.',
    encouragingFeedback: '¡Pensemos en cómo nos gusta que nos escuchen cuando hablamos!',
    options: [
      { id: 'opt_escuchar', text: '👂 Escuchar con atención y respeto', isCorrect: true },
      { id: 'opt_gritar', text: '📢 Gritar todos al mismo tiempo', isCorrect: false },
      { id: 'opt_ignorar', text: '🙈 Ignorar a la persona', isCorrect: false }
    ]
  },

  // ==========================================
  // INGLÉS
  // ==========================================
  {
    id: 'ingles_color_blue',
    subjectId: 'ingles',
    type: 'english_vocab',
    title: 'Colors: What is BLUE?',
    instruction: 'Listen and select the color: BLUE 💙.',
    instructionAudio: 'Select the color blue, like the sky and the sea.',
    difficulty: 1,
    skillCategory: 'English Vocabulary: Colors',
    visualCue: '🎨 💙',
    hint: 'Blue is the color of the clear sky and oceans.',
    correctFeedback: 'Great job! Blue is azul en español.',
    encouragingFeedback: 'Listen again: B-L-U-E. Touch the blue icon!',
    options: [
      { id: 'opt_blue', text: '💙 Blue', isCorrect: true },
      { id: 'opt_red', text: '❤️ Red', isCorrect: false },
      { id: 'opt_green', text: '💚 Green', isCorrect: false }
    ]
  },
  {
    id: 'ingles_animal_cat',
    subjectId: 'ingles',
    type: 'english_vocab',
    title: 'Animals: Where is the CAT?',
    instruction: 'Listen to the word: CAT 🐱. Which picture is it?',
    instructionAudio: 'Can you find the cat? Meow!',
    difficulty: 1,
    skillCategory: 'English Vocabulary: Animals',
    visualCue: '🐱 🐶 🐰',
    hint: 'A cat says: Meow!',
    correctFeedback: 'Awesome! Cat means gato.',
    encouragingFeedback: 'Try once more! A cat has whiskers and purrs.',
    options: [
      { id: 'opt_cat', text: '🐱 Cat', isCorrect: true },
      { id: 'opt_dog', text: '🐶 Dog', isCorrect: false },
      { id: 'opt_bird', text: '🐦 Bird', isCorrect: false }
    ]
  },
  {
    id: 'ingles_pronuncia_hello',
    subjectId: 'ingles',
    type: 'voice_pronunciation',
    title: 'Speak English: HELLO 👋',
    instruction: 'Tap the microphone and say: HELLO! (¡Hola!)',
    instructionAudio: 'Tap the microphone and say hello with a bright smile!',
    difficulty: 1,
    skillCategory: 'English Pronunciation',
    targetWord: 'hello',
    visualCue: '👋 😊',
    hint: 'Say: Heh - low!',
    correctFeedback: 'Fantastic pronunciation! You sound like a native explorer.',
    encouragingFeedback: 'Almost there! Take a breath and say: HE-LLO!'
  },
  {
    id: 'ingles_number_three',
    subjectId: 'ingles',
    type: 'english_vocab',
    title: 'Numbers: Count to THREE',
    instruction: 'Which card shows the number: THREE (3)?',
    instructionAudio: 'One, two, three! Touch the number three.',
    difficulty: 1,
    skillCategory: 'English Vocabulary: Numbers',
    visualCue: '1️⃣ 2️⃣ 3️⃣',
    hint: 'One, two, THREE!',
    correctFeedback: 'Super! Three is the number 3.',
    encouragingFeedback: 'Count on your fingers: 1, 2, 3!',
    options: [
      { id: 'opt_3', text: '3️⃣ Three', isCorrect: true },
      { id: 'opt_5', text: '5️⃣ Five', isCorrect: false },
      { id: 'opt_8', text: '8️⃣ Eight', isCorrect: false }
    ]
  },

  // ==========================================
  // ENTRENA TU CEREBRO (NEURO-ENTRENAMIENTO)
  // ==========================================
  {
    id: 'cerebro_memoria_auditiva',
    subjectId: 'cerebro',
    type: 'auditory_memory',
    title: 'Memoria Sonora: Eco Musical',
    instruction: 'Escucha la melodía de 3 notas y repite la misma secuencia tocando las campanas de colores.',
    instructionAudio: 'Escucha con tus oídos mágicos las notas y tócalas en el mismo orden.',
    difficulty: 1,
    skillCategory: 'Memoria auditiva secuencial',
    visualCue: '🔔 🎵',
    hint: 'Las notas suenan de izquierda a derecha. Escucha el ritmo.',
    correctFeedback: '¡Oído absoluto! Has reproducido la melodía con exactitud.',
    encouragingFeedback: '¡Escucha otra vez con el botón de sonido! Tú puedes recordar la canción.',
    metadata: {
      sequence: [0, 2, 1] // Índices de notas musicales
    }
  },
  {
    id: 'cerebro_letras_espejo',
    subjectId: 'cerebro',
    type: 'mirror_letters',
    title: 'Cazador de Letras Espejo: Encuentra las "b"',
    instruction: '¡Cuidado con el espejo! Toca todas las letras "b" que tengan su pancita a la derecha 👉.',
    instructionAudio: 'Toca únicamente las letras b. Recuerda: su pancita mira hacia la derecha.',
    difficulty: 1,
    skillCategory: 'Discriminación visual espacial (b/d/p/q)',
    visualCue: '🔍 b vs d',
    hint: 'Si la pancita mira a la derecha es una "b". Si mira a la izquierda es una "d".',
    correctFeedback: '¡Ojos de águila! Has identificado todas las "b" sin confundirte con el espejo.',
    encouragingFeedback: '¡Observa con calma! Fíjate hacia dónde apunta la curvita de cada letra.',
    metadata: {
      grid: ['b', 'd', 'b', 'p', 'd', 'b', 'q', 'b'],
      target: 'b'
    }
  },
  {
    id: 'cerebro_memoria_visual',
    subjectId: 'cerebro',
    type: 'visual_memory',
    title: 'Memoria Visual: ¿Dónde estaba la Estrella?',
    instruction: 'Memoriza dónde está la estrella dorada ⭐ antes de que las cartas se volteen.',
    instructionAudio: 'Mira con atención. ¿En qué carta está la estrella dorada? ¡Luego encuéntrala!',
    difficulty: 1,
    skillCategory: 'Memoria de trabajo visual',
    visualCue: '🃏 ⭐',
    hint: 'Recuerda si estaba en la izquierda, en el centro o en la derecha.',
    correctFeedback: '¡Memoria fotográfica! Tu cerebro está cada vez más ágil.',
    encouragingFeedback: '¡Buen intento! Tu cerebro entrenó hoy su músculo de la memoria.'
  },
  {
    id: 'cerebro_orden_secuencia',
    subjectId: 'cerebro',
    type: 'temporal_ordering',
    title: 'Línea de Tiempo: La Semillita que Crece',
    instruction: 'Ordena la historia en orden temporal: ¿Qué ocurre primero, después y al final?',
    instructionAudio: '¿Qué paso va primero para tener una hermosa flor?',
    difficulty: 1,
    skillCategory: 'Secuenciación temporal',
    visualCue: '🌱 ➔ 🌿 ➔ 🌻',
    hint: 'Primero plantamos la semillita, luego sale un brote verde y al final florece.',
    correctFeedback: '¡Perfecto orden de la naturaleza! Primero semilla, luego brote, luego flor.',
    encouragingFeedback: '¡Piensa en el ciclo de la vida! Toda planta empieza siendo una pequeña semilla.',
    metadata: {
      steps: [
        { id: 'step_1', label: '1. Plantar la semilla en la tierra 🌱' },
        { id: 'step_2', label: '2. Regar con agua y ver nacer el tallito 🌿' },
        { id: 'step_3', label: '3. Florece un hermoso girasol 🌻' }
      ]
    }
  }
];

export const SUBJECT_INFO: Record<string, { name: string; icon: string; color: string; bgGradient: string; description: string }> = {
  lengua: {
    name: 'Lengua Castellana',
    icon: '📚',
    color: 'emerald',
    bgGradient: 'from-emerald-500 to-teal-600',
    description: 'Letras, sonidos, palabras, lectura guiada y comprensión sin estrés.'
  },
  matematicas: {
    name: 'Matemáticas',
    icon: '🔢',
    color: 'amber',
    bgGradient: 'from-amber-500 to-orange-600',
    description: 'Conteo visual, sumas manipulables, balanzas y problemas con dibujos.'
  },
  ciencias_naturales: {
    name: 'Ciencias Naturales',
    icon: '🌱',
    color: 'lime',
    bgGradient: 'from-green-500 to-emerald-600',
    description: 'Animales, plantas, sentidos, cuerpo humano y el planeta Tierra.'
  },
  ciencias_sociales: {
    name: 'Ciencias Sociales',
    icon: '🌎',
    color: 'sky',
    bgGradient: 'from-sky-500 to-blue-600',
    description: 'Comunidad, Colombia, mapas, convivencia y derechos de los niños.'
  },
  ingles: {
    name: 'Inglés',
    icon: '🇬🇧',
    color: 'indigo',
    bgGradient: 'from-indigo-500 to-violet-600',
    description: 'Vocabulario visual, pronunciación interactiva y juegos auditivos.'
  },
  cerebro: {
    name: 'Entrena tu Cerebro',
    icon: '🧠',
    color: 'purple',
    bgGradient: 'from-purple-500 to-fuchsia-600',
    description: 'Memoria auditiva, letras espejo, búsqueda visual y atención plena.'
  }
};
