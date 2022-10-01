<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=default'></script>

<strong>Theory:</strong> The time response has utmost importance for the design and analysis of control systems because these are inherently time domain systems where time is independent variable. During the analysis of response, the variation of output with respect to time can be studied and it is known as time response. To obtain satisfactory performance of the system with respect to time must be within the specified limits. From time response analysis and corresponding results, the stability of the system, accuracy of the system, and complete evaluation can be studied easily. Due to the application of an excitation to a system, the response of the system is known as time response and it is a transient response; steady-state response.
<br>
<br>
<strong><em>Transient Response:</em></strong> The part of the time response which goes to zero after large interval of time is known as transient response.<br>
<strong><em>Steady State Response:</em></strong> The part of response that means even after the transients have died out is said to be steady state response.
<br><br>
The total response of a system is sum of <em>transient response</em> and <em>steady state response.</em> 
$${C(t)=C<sub>tr</sub>(t) + C<sub>ss</sub>(t)}$$
<br>
<br>
<strong><em> Time Response Specification Parameters:</em></strong> The transfer function of 2<sub>nd</sub> order system is generally represented by the following transfer funnction:<br>
<img src="./images/theoryeq1.svg">
<br>
The dynamic behavior of the second order system can then be described in terms of two parameters: the <em>dumping ratio</em> and the <em>natural frequency</em>.<br>
If the dumping ratio is between 0 and 1, the system poles are complex conjugates and lie in  the left half s plane. The system is then called <strong><em> underdamped</em></strong>, and the transient response is <strong><em> oscillatory </em></strong>. If the damping ratio is equal to 1 the system is called <strong><em>critically damped </em></strong>, and when the damping ratio is larger than 1 we have <strong><em>overdamoed system</em></strong>. The transient response of critically damped and overdamped systems do not oscillate. If the damping ratio is 0, the transient response does not die out.


