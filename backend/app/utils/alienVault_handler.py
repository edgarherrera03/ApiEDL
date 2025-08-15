from OTXv2 import OTXv2
from OTXv2 import IndicatorTypes
from datetime import datetime
import math
import ipaddress

OTX_API_KEY = 'a7e694cd46bd10ea918fa964d092421d63cb2511cc10e6fe989fffed594cc6d0'

otx = OTXv2(OTX_API_KEY)

def get_indicator_info(indicator: str, type_: str):
    """
    Obtiene los pulses para un IP, dominio o hash.
    """
    try:
        if type_ == "IPv4":
            return otx.get_indicator_details_by_section(IndicatorTypes.IPv4, indicator, "general")
        elif type_ == "IPv6":
            return otx.get_indicator_details_by_section(IndicatorTypes.IPv6, indicator, "general")
        elif type_ == "domain":
            return otx.get_indicator_details_by_section(IndicatorTypes.DOMAIN, indicator, "general")
        elif type_ == "hash":
            return otx.get_indicator_details_by_section(IndicatorTypes.FILE_HASH_SHA256, indicator, "general")
        else:
            return []
    except Exception as e:
        print(f"[!] Error obteniendo pulses: {e}")
        return []

# Funcion que calcula el score atribuido a un elemento buscado en Alien Vault basado en el numero de pulsos y de su antiguedad
def calculate_score(pulses):
    now = datetime.now()
    score_sum = 0

    for pulse in pulses:
        try:
            date = pulse['modified']
            pulse_date = datetime.strptime(date, '%Y-%m-%dT%H:%M:%S.%f')
            days = max((now - pulse_date).days, 1) # Calculamos la cantidad de dias que han pasado entre la actualidad y el pulso
            # Un cuatrimestre = 4 meses = 120 dias
            cuatrimestre = math.ceil(days / 120)
            # Dependiendo de la antiguedad que tengan los pulsos, su aporte a la calificacion sera menor o mayor
            score_sum += 1 / math.log(math.e - 1 + cuatrimestre)
        except Exception:
            continue

    total_pulses = len(pulses)

    if total_pulses == 0 or score_sum == 0:
        return 0

    coef_time = 2 + 1 / (-1 + 1 / (3 * score_sum))
    coef_amount = (math.pow(total_pulses, 2) + 93) / (math.pow(total_pulses, 2) + 188)
    final_score = math.ceil(coef_time * coef_amount * 100)
    return final_score

def classify_indicator(indicator: str, indicator_type: str):
    try:
        # Determinar el tipo de IP automáticamente 
        if indicator_type == 'ip':
            try:
                ip_ver = ipaddress.ip_address(indicator).version
                indicator_type = "IPv4" if ip_ver == 4 else "IPv6"
            except:
                return 

        # Obtener detalles del indicador desde AlienVault OTX
        indicatorDetails = get_indicator_info(indicator, indicator_type)
        pulses = indicatorDetails['pulse_info']['pulses']
        score = calculate_score(pulses)

        # Extraemos los valores que nos interesan para la ApiEDL (pais y calificacion)
        return {
            "country": f'{indicatorDetails.get('country_name', 'N/A')} ({indicatorDetails.get('country_code', 'N/A')})',
            "rating": score
        }
    except:
        return None
    

